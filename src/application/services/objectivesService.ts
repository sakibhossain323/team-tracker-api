import prisma from "@/infrastructure/prisma/client";
import { CreateObjectiveDto, Result, UserDto } from "@/application/dtos";
import { ForbiddenError, NotFoundError } from "@/application/resultErrors";
import { get } from "http";

const createObjective = async (
    objectiveDto: CreateObjectiveDto,
    userDto: UserDto
) => {
    console.log(objectiveDto, userDto);
    const membership = await prisma.membership.findUnique({
        where: {
            userId_teamId: {
                userId: userDto.id,
                teamId: objectiveDto.teamId,
            },
        },
    });

    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }
    const objective = await prisma.objective.create({
        data: {
            title: objectiveDto.title,
            description: objectiveDto.description,
            team: {
                connect: {
                    id: objectiveDto.teamId,
                },
            },
        },
    });
    return Result.success(objective);
};

const getAllObjectives = async (teamId: number, user: UserDto) => {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_teamId: {
                userId: user.id,
                teamId: teamId,
            },
        },
    });
    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }
    const objectives = await prisma.objective.findMany({
        where: {
            teamId: teamId,
        },
    });
    return Result.success(objectives);
};

const getObjectiveById = async (id: number, teamId: number, user: UserDto) => {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_teamId: {
                userId: user.id,
                teamId: teamId,
            },
        },
    });
    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }
    const objective = await prisma.objective.findUnique({
        where: {
            id: id,
            teamId: teamId,
        },
    });
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
