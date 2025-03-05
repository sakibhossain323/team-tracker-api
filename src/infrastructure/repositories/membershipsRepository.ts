import prisma from "../prisma/client";

export async function hasMembership(userId: number, teamId: number) {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_teamId: {
                userId,
                teamId,
            },
        },
    });

    return membership !== null;
}

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
