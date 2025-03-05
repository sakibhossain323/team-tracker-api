import prisma from "@/infrastructure/prisma/client";
import {
    CreateTeamDto,
    Result,
    UpdateTeamDto,
    UserDto,
} from "@/application/dtos";
import { ForbiddenError, NotFoundError } from "@/application/resultErrors";
import membershipsRepository from "@/infrastructure/repositories/membershipsRepository";
import teamsRepository from "@/infrastructure/repositories/teamsRepository";

const createTeam = async (teamDto: CreateTeamDto, userDto: UserDto) => {
    return await prisma.team.create({
        data: {
            name: teamDto.name,
            description: teamDto.description,
            memberships: {
                create: [
                    {
                        role: "ADMIN",
                        user: {
                            connect: {
                                id: userDto.id,
                            },
                        },
                    },
                ],
            },
        },
    });
};

const getAllTeams = async (user: UserDto) => {
    return await prisma.team.findMany({
        where: {
            memberships: {
                some: {
                    userId: user.id,
                },
            },
        },
    });
};

const getTeamById = async (id: number, user: UserDto) => {
    const membership = await membershipsRepository.findByUserIdAndTeamId(
        user.id,
        id
    );
    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }

    const team = await teamsRepository.findTeamById(id);
    if (team === null) {
        return Result.fail(new NotFoundError("Team", id));
    }

    return Result.success(team);
};

const updateTeamDetails = async (teamDto: UpdateTeamDto, userDto: UserDto) => {
    const id = teamDto.id;

    const membership = await membershipsRepository.findByUserIdAndTeamId(
        userDto.id,
        id
    );
    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }

    const team = await teamsRepository.findTeamById(id);
    if (team === null) {
        return Result.fail(new NotFoundError("Team", id));
    }

    const updatedTeam = await prisma.team.update({
        where: {
            id,
        },
        data: {
            name: teamDto.name,
            description: teamDto.description,
        },
    });

    return Result.success(updatedTeam);
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeamDetails,
};
