import prisma from "@/infrastructure/prisma/client";
import e from "express";

class TeamServices {
    async createTeam(data: any) {
        return await prisma.team.create({
            data,
        });
    }

    async getTeams() {
        return await prisma.team.findMany();
    }

    async getTeamById(id: number) {
        return await prisma.team.findUnique({
            where: {
                id,
            },
        });
    }

    async updateTeam(id: number, data: any) {
        return await prisma.team.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteTeam(id: number) {
        return await prisma.team.delete({
            where: {
                id,
            },
        });
    }
}

const teamServices = new TeamServices();

export default teamServices;
