import "dotenv/config";
import {prisma} from "./lib/prisma";

const tickets = [
    {
        title: 'ticket 1',
        content: 'this is the first ticket from the database.',
        status: 'DONE' as const
    },
    {
        title: 'ticket 2',
        content: 'this is the second ticket from the database.',
        status: 'OPEN' as const
    },
    {
        title: 'ticket 3',
        content: 'this is the third ticket from the database.',
        status: 'IN_PROGRESS' as const
    }
]

const seed = async () => {
    const t0= performance.now()
    console.log("DB Seed:Started ...")

    await prisma.ticket.deleteMany()

    await prisma.ticket.createMany({
        data: tickets,
    });

    const t1=performance.now()
    console.log(`DB Seed: Finished (\`${t1-t0}\`)`)
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