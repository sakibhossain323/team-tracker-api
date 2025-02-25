import prisma from "@/infrastructure/prisma/client";
import { CreateTeamDto, UserDto } from "@/application/dtos";

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

export default {
    createTeam,
};
