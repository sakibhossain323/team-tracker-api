import prisma from "../prisma/client";

const findByIdAndObjId = async (id: number, objectiveId: number) => {
    return prisma.task.findUnique({
        where: {
            id,
            objectiveId,
        },
    });
};

export default { findByIdAndObjId };
