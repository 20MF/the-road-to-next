import "dotenv/config";
import {prisma} from "./lib/prisma";
import {hash} from "@node-rs/argon2";

const users = [
    {
        username: "admin",
        email: "admin@admin.com",
    },
    {
        username: "user",
        // use your own email here
        email: "hello@road-to-next.com",
    },
];

const tickets = [
    {
        title: "Ticket 1",
        content: "First ticket from DB.",
        status: "DONE" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 499,
    },
    {
        title: "Ticket 2",
        content: "Second ticket from DB.",
        status: "OPEN" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 399,
    },
    {
        title: "Ticket 3",
        content: "Third ticket from DB.",
        status: "IN_PROGRESS" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 599,
    },
];

const seed = async () => {
    const t0 = performance.now()
    console.log("DB Seed:Started ...")

    await prisma.ticket.deleteMany()
    await prisma.user.deleteMany()

    const passwordHash = await hash("password")

    const dbUser = await prisma.user.createManyAndReturn({
        data: users.map((user) => ({
            ...user,
            passwordHash,
        })),
    })

    await prisma.ticket.createMany({
        data: tickets.map((ticket) => ({
            ...ticket,
            userId: dbUser[0].id,
        })),
    });

    const t1 = performance.now()
    console.log(`DB Seed: Finished (\`${t1 - t0}\`)`)
}

seed()


// async function createUsers() {
//     const usersData = [
//         {email: 'user1@example.com'},
//         {email: 'admin@example.com'},
//         {email: 'guest@example.com'}
//     ];
//
//     try {
//         const result = await prisma.user.createMany({
//             data: usersData,
//             skipDuplicates: true // 如果希望跳过重复的条目，可以设置这个选项
//         });
//         console.log(result); // 输出结果，例如插入的条目数等
//     } catch (error) {
//         console.error(error);
//     } finally {
//         await prisma.$disconnect(); // 确保在结束时断开连接
//     }
// }
//
// createUsers();