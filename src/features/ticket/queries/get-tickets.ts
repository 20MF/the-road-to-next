import {prisma} from "@/lib/prisma";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";
import {SearchParams} from "@/features/ticket/search-params";

export const getTickets = async (userId: string | StringFilter<"Ticket"> | undefined,
                                 searchParams: SearchParams) => {

    return await prisma.ticket.findMany({
        orderBy: {
            ...(searchParams.sort===undefined && {createdAt:"desc"}),
            ...(searchParams.sort==="bounty" && {bounty:"desc"})
        },
        where: {
            userId,
            ...(typeof searchParams.search === "string" && {
                title: {
                    contains: searchParams.search,
                    mode: "insensitive"
                }
            }),
        },
        include: {
            user: {
                select: {username: true}
            }
        }
    });
}
