import prisma from "@/infrastructure/prisma/client";
import { CreateTeamDto, Result, UserDto } from "@/application/dtos";
import { NotFoundError } from "@/application/resultErrors";

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

const getTeamById = async (id: number) => {
    const team = await prisma.team.findUnique({
        where: {
            id: id,
        },
    });
    if (team === null) {
        return Result.fail(new NotFoundError("Team", id));
    }
    return Result.success(team);
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
};
