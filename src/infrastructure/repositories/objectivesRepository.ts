import prisma from "../prisma/client";

export async function isObjectiveValid(teamId: number, objectiveId: number) {
    const objective = await prisma.objective.findUnique({
        where: {
            id: objectiveId,
        },
    });

    return objective?.teamId === teamId;
}

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
