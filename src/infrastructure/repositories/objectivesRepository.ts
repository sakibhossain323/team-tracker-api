import prisma from "../prisma/client";

const findByIdAndTeamId = async (id: number, teamId: number) => {
    return await prisma.objective.findUnique({
        where: {
            id,
            teamId: teamId,
        },
    });
};

export default {
    findByIdAndTeamId,
};
