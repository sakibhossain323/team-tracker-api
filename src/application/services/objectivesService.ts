import prisma from "@/infrastructure/prisma/client";
import {
    CreateObjectiveDto,
    Result,
    UpdateObjectiveDto,
    UserDto,
} from "@/application/dtos";
import { ForbiddenError, NotFoundError } from "@/application/resultErrors";
import membershipsRepository from "@/infrastructure/repositories/membershipsRepository";
import objectivesRepository from "@/infrastructure/repositories/objectivesRepository";
import tasksRepository from "@/infrastructure/repositories/tasksRepository";
import { taskStatus } from "@/domain/constants";

const validate = async (userId: number, teamId: number) => {
    const membership = await membershipsRepository.findByUserIdAndTeamId(
        userId,
        teamId
    );
    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }

    return Result.success(null);
};

const createObjective = async (
    objectiveDto: CreateObjectiveDto,
    userDto: UserDto
) => {
    const { teamId } = objectiveDto;

    const validation = await validate(userDto.id, teamId);
    if (validation.error) {
        return validation;
    }

    const objective = await prisma.objective.create({
        data: {
            title: objectiveDto.title,
            description: objectiveDto.description,
            team: {
                connect: {
                    id: teamId,
                },
            },
        },
    });

    return Result.success(objective);
};

const getAllObjectives = async (teamId: number, userDto: UserDto) => {
    const validation = await validate(userDto.id, teamId);
    if (validation.error) {
        return validation;
    }

    const objectives = await prisma.objective.findMany({
        where: {
            teamId: teamId,
        },
    });
    return Result.success(objectives);
};

const getObjectiveById = async (
    id: number,
    teamId: number,
    userDto: UserDto
) => {
    const validation = await validate(userDto.id, teamId);
    if (validation.error) {
        return validation;
    }

    const objective = await objectivesRepository.findByIdAndTeamId(id, teamId);
    if (objective === null) {
        return Result.fail(new NotFoundError("Objective", id));
    }

    return Result.success(objective);
};

const updateObjective = async (
    objectiveDto: UpdateObjectiveDto,
    userDto: UserDto
) => {
    const { id, teamId } = objectiveDto;

    const validation = await validate(userDto.id, teamId);
    if (validation.error) {
        return validation;
    }

    const objective = await objectivesRepository.findByIdAndTeamId(id, teamId);
    if (objective === null) {
        return Result.fail(new NotFoundError("Objective", id));
    }

    const updatedObjective = await prisma.objective.update({
        where: {
            id: id,
        },
        data: {
            title: objectiveDto.title,
            description: objectiveDto.description,
        },
    });

    return Result.success(updatedObjective);
};

const deleteObjective = async (
    id: number,
    teamId: number,
    userDto: UserDto
) => {
    const validation = await validate(userDto.id, teamId);
    if (validation.error) {
        return validation;
    }

    const objective = await objectivesRepository.findByIdAndTeamId(id, teamId);
    if (objective === null) {
        return Result.fail(new NotFoundError("Objective", id));
    }

    await prisma.objective.delete({
        where: {
            id: id,
        },
    });

    return Result.success(null);
};

const getObjectiveStatus = async (
    id: number,
    teamId: number,
    userDto: UserDto
) => {
    const validation = await validate(userDto.id, teamId);
    if (validation.error) {
        return validation;
    }

    const notStarted = await tasksRepository.countAllByObjIdAndStatus(
        id,
        taskStatus.NOT_STARTED
    );
    const inProgress = await tasksRepository.countAllByObjIdAndStatus(
        id,
        taskStatus.IN_PROGRESS
    );
    const completed = await tasksRepository.countAllByObjIdAndStatus(
        id,
        taskStatus.COMPLETED
    );
    const Total = notStarted + inProgress + completed;
    return Result.success({
        Total,
        Completed: ((completed / Total) * 100).toFixed(2) + "%",
        Details: {
            [taskStatus.NOT_STARTED]: notStarted,
            [taskStatus.IN_PROGRESS]: inProgress,
            [taskStatus.COMPLETED]: completed,
        },
    });
};

export default {
    createObjective,
    getAllObjectives,
    getObjectiveById,
    updateObjective,
    deleteObjective,
    getObjectiveStatus,
};
