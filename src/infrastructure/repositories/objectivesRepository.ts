import prisma from "../prisma/client";

export async function isObjectiveValid(teamId: number, objectiveId: number) {
    const objective = await prisma.objective.findUnique({
        where: {
            id: objectiveId,
        },
    });

    return objective?.teamId === teamId;
}
