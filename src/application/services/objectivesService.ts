import prisma from "@/infrastructure/prisma/client";
import { CreateObjectiveDto, Result, UserDto } from "@/application/dtos";
import { ForbiddenError, NotFoundError } from "@/application/resultErrors";
import { hasMembership } from "@/infrastructure/repositories/membershipsRepository";
import objectivesRepository from "@/infrastructure/repositories/objectivesRepository";

const validate = async (userId: number, teamId: number) => {
    const has = await hasMembership(userId, teamId);
    if (!has) {
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

export default {
    createObjective,
    getAllObjectives,
    getObjectiveById,
};
