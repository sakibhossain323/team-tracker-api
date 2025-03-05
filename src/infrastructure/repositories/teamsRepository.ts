import prisma from "../prisma/client";

const findTeamById = async (id: number) => {
    return await prisma.team.findUnique({
        where: {
            id,
        },
    });
};

export default {
    findTeamById,
};
