import prisma from "@/infrastructure/prisma/client";
import {
    CreateTeamDto,
    Result,
    UpdateTeamDetailsDto,
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

const updateTeamDetails = async (
    teamDto: UpdateTeamDetailsDto,
    userDto: UserDto
) => {
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

const getAllMembers = async (teamId: number, user: UserDto) => {
    const membership = await membershipsRepository.findByUserIdAndTeamId(
        user.id,
        teamId
    );
    if (membership === null) {
        return Result.fail(new ForbiddenError());
    }

    const members = await prisma.membership.findMany({
        where: {
            teamId,
        },
        omit: {
            userId: true,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
        },
    });

    return Result.success(members);
};

const addMember = async (teamId: number, email: string, userDto: UserDto) => {
    const membership = await membershipsRepository.findByUserIdAndTeamId(
        userDto.id,
        teamId
    );
    if (membership === null || membership.role !== "ADMIN") {
        return Result.fail(new ForbiddenError());
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (user === null) {
        return Result.fail(new NotFoundError("User", email));
    }

    const newMembership = await prisma.membership.create({
        data: {
            role: "MEMBER",
            userId: user.id,
            teamId,
        },
    });

    return Result.success(newMembership);
};

const removeMember = async (teamId: number, userId: number, user: UserDto) => {
    const membership = await membershipsRepository.findByUserIdAndTeamId(
        user.id,
        teamId
    );
    if (membership === null || membership.role !== "ADMIN") {
        return Result.fail(new ForbiddenError());
    }

    const existingMembership =
        await membershipsRepository.findByUserIdAndTeamId(userId, teamId);

    if (existingMembership === null) {
        return Result.fail(new NotFoundError("Member", userId));
    }

    await prisma.membership.delete({
        where: {
            userId_teamId: {
                userId,
                teamId,
            },
        },
    });

    return Result.success(null);
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeamDetails,
    getAllMembers,
    addMember,
    removeMember,
};
