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
