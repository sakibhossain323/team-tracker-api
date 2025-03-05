import prisma from "../prisma/client";

const findByUserIdAndTeamId = async (userId: number, teamId: number) => {
    return await prisma.membership.findUnique({
        where: {
            userId_teamId: {
                userId,
                teamId,
            },
        },
    });
};

export default {
    findByUserIdAndTeamId,
};
