import prisma from "../prisma/client";

const countAllByObjIdAndStatus = async (
    objectiveId: number,
    status: string
) => {
    return await prisma.task.count({
        where: {
            objectiveId,
            status,
        },
    });
};

const findByIdAndObjId = async (id: number, objectiveId: number) => {
    return prisma.task.findUnique({
        where: {
            id,
            objectiveId,
        },
    });
};

export default { findByIdAndObjId, countAllByObjIdAndStatus };
