import prisma from "../prisma/client";

const findTaskByIdAndObjId = async (id: number, objectiveId: number) => {
    return prisma.task.findUnique({
        where: {
            id,
            objectiveId,
        },
    });
};

export default { findTaskByIdAndObjId };
