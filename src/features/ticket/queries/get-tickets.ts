import {prisma} from "@/lib/prisma";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";

export const getTickets = async (userId: string | StringFilter<"Ticket"> | undefined) => {
    return await prisma.ticket.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            userId,
        },
        include: {
            user: {
                select: {username: true}
            }
        }
    });
}
