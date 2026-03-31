import {prisma} from "@/lib/prisma";
import {ParsedSearchParams} from "@/features/ticket/search-params";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";

export const getTickets = async (
    userId: string | StringFilter<"Ticket"> | undefined,
    searchParams: ParsedSearchParams
) => {

    const where = {
        userId,
        title: {
            contains: searchParams.search,
            mode: "insensitive" as const
        }
    }

    const skip = searchParams.page * searchParams.size
    const take = searchParams.size

    const [tickets, count] = await prisma.$transaction([
        prisma.ticket.findMany({
            where,
            skip,
            take,
            orderBy: {
                [searchParams.sortKey]: searchParams.sortValue,
            },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        }),
        prisma.ticket.count({
            where,
        }),
    ]);

    return {
        list: tickets,
        metadata: {
            count,
            hasNextPage: count > skip + take
        }
    }
}
