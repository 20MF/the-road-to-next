import {prisma} from "@/lib/prisma";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";
import {ParsedSearchParams} from "@/features/ticket/search-params";

export const getTickets = async (userId: string | StringFilter<"Ticket"> | undefined,
                                 searchParams: ParsedSearchParams) => {

    return await prisma.ticket.findMany({
        orderBy: {
            ...(searchParams.sort === "newest" && {createdAt: "desc"}),
            ...(searchParams.sort === "bounty" && {bounty: "desc"})
        },
        where: {
            userId,
            title: {
                contains: searchParams.search,
                mode: "insensitive"
            }
        },
        include: {
            user: {
                select: {username: true}
            }
        }
    });
}
