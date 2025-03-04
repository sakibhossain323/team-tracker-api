import { taskStatus } from "@/domain/constants";
import prisma from "@/infrastructure/prisma/client";
import {
    CreateTaskDto,
    Result,
    UpdateTaskDetailsDto,
    UpdateTaskStatusDto,
    UserDto,
} from "@/application/dtos";
import {
    ForbiddenError,
    NotFoundError,
    ValidationError,
} from "@/application/resultErrors";
import { hasMembership } from "@/infrastructure/repositories/membershipsRepository";
import objectivesRepository from "@/infrastructure/repositories/objectivesRepository";
import tasksRepository from "@/infrastructure/repositories/tasksRepository";

const validateScope = async (
    userId: number,
    teamId: number,
    objectiveId: number
) => {
    const has = await hasMembership(userId, teamId);
    if (!has) {
        return Result.fail(new ForbiddenError());
    }

    const objective = await objectivesRepository.findByIdAndTeamId(
        objectiveId,
        teamId
    );
    if (objective === null) {
        return Result.fail(new NotFoundError("Objective", objectiveId));
    }

    return Result.success(null);
};

const createTask = async (taskDto: CreateTaskDto, userDto: UserDto) => {
    const { teamId, objectiveId } = taskDto;

    const validation = await validateScope(userDto.id, teamId, objectiveId);
    if (validation.error) {
        return validation;
    }

    const task = await prisma.task.create({
        data: {
            title: taskDto.title,
            description: taskDto.description,
            objectiveId: taskDto.objectiveId,
            assigneeId: taskDto.assigneeId,
            status: taskStatus.NOT_STARTED,
        },
    });

    return Result.success(task);
};

const getAllTasks = async (
    teamId: number,
    objectiveId: number,
    userDto: UserDto
) => {
    const validation = await validateScope(userDto.id, teamId, objectiveId);
    if (validation.error) {
        return validation;
    }

    const tasks = await prisma.task.findMany({
        where: {
            objectiveId,
        },
    });

    return Result.success(tasks);
};

const getTaskById = async (
    id: number,
    teamId: number,
    objectiveId: number,
    userDto: UserDto
) => {
    const validation = await validateScope(userDto.id, teamId, objectiveId);
    if (validation.error) {
        return validation;
    }

    const task = await tasksRepository.findByIdAndObjId(id, objectiveId);
    if (task === null) {
        return Result.fail(new NotFoundError("Task", id));
    }

    return Result.success(task);
};

const updateTaskDetails = async (
    taskDto: UpdateTaskDetailsDto,
    userDto: UserDto
) => {
    const { id, teamId, objectiveId } = taskDto;

    const validation = await validateScope(userDto.id, teamId, objectiveId);
    if (validation.error) {
        return validation;
    }

    const task = await tasksRepository.findByIdAndObjId(id, objectiveId);
    if (task === null) {
        return Result.fail(new NotFoundError("Task", taskDto.id));
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: taskDto.id,
        },
        data: {
            title: taskDto.title,
            description: taskDto.description,
        },
    });

    return Result.success(updatedTask);
};

const updateTaskStatus = async (
    taskStatusDto: UpdateTaskStatusDto,
    userDto: UserDto
) => {
    const { id, teamId, objectiveId, status } = taskStatusDto;

    const validation = await validateScope(userDto.id, teamId, objectiveId);
    if (validation.error) {
        return validation;
    }

    const task = await tasksRepository.findByIdAndObjId(id, objectiveId);
    if (task === null) {
        return Result.fail(new NotFoundError("Task", id));
    }

    if (!Object.values(taskStatus).includes(status)) {
        const validStatuses = Object.values(taskStatus).join(", ");
        return Result.fail(
            new ValidationError(
                `Invalid status! Valid values are: ${validStatuses}`
            )
        );
    }

    const updatedTask = await prisma.task.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });

    return Result.success(updatedTask);
};

const deleteTask = async (
    id: number,
    teamId: number,
    objectiveId: number,
    userDto: UserDto
) => {
    const validation = await validateScope(userDto.id, teamId, objectiveId);
    if (validation.error) {
        return validation;
    }

    const task = await tasksRepository.findByIdAndObjId(id, objectiveId);
    if (task === null) {
        return Result.fail(new NotFoundError("Task", id));
    }

    await prisma.task.delete({
        where: {
            id,
        },
    });

    return Result.success(null);
};

export default {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskDetails,
    updateTaskStatus,
    deleteTask,
};
