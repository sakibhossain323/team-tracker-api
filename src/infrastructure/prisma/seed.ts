import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
    {
        email: "admin@test.com",
        username: "admin",
        password: process.env.PASS!,
    },
    {
        email: "admin2@test.com",
        username: "admin2",
        password: process.env.PASS!,
    },
    {
        email: "admin3@test.com",
        username: "admin3",
        password: process.env.PASS!,
    },
];

const createTeams = async (teamNo: number, username: string) => {
    await prisma.team.create({
        data: {
            name: `Team ${teamNo}`,
            description: `Team ${teamNo} of ${username}`,
            memberships: {
                create: [
                    {
                        role: "ADMIN",
                        user: {
                            connect: {
                                username: username,
                            },
                        },
                    },
                ],
            },
        },
    });
};

const createObjectives = async (objNo: number) => {
    const teams = await prisma.team.findMany({
        select: {
            id: true,
        },
    });

    for (const team of teams) {
        const teamId = team.id;
        await prisma.objective.create({
            data: {
                title: `Objective ${objNo}`,
                description: `Objective ${objNo} of Team ${teamId}`,
                team: {
                    connect: {
                        id: teamId,
                    },
                },
            },
        });
    }
};

const createTasks = async (taskNo: number) => {
    const objectives = await prisma.objective.findMany({
        select: {
            id: true,
        },
    });

    for (const objective of objectives) {
        const objectiveId = objective.id;
        await prisma.task.create({
            data: {
                title: `Task ${taskNo}`,
                description: `Task ${taskNo} of Objective ${objectiveId}`,
                objective: {
                    connect: {
                        id: objectiveId,
                    },
                },
                status: "NOT_STARTED",
            },
        });
    }
};

const main = async () => {
    for (const user of users) {
        await prisma.user.create({
            data: user,
        });

        for (let i = 1; i <= 3; i++) {
            await createTeams(i, user.username);
        }
    }

    for (let i = 1; i <= 3; i++) {
        await createObjectives(i);
    }

    for (let i = 1; i <= 3; i++) {
        await createTasks(i);
    }
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
