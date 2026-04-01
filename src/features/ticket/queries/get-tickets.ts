import {prisma} from "@/lib/prisma";
import {ParsedSearchParams} from "@/features/ticket/search-params";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";
import {getAuthOrRedirect} from "@/features/auth/queries/get-auth-or-redirect";
import {getAuth} from "@/features/auth/queries/get-auth";
import {isOwner} from "@/features/auth/utils/is-owner";

export const getTickets = async (
    userId: string | StringFilter<"Ticket"> | undefined,
    searchParams: ParsedSearchParams
) => {
    const {user} = await getAuth()

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
        list: tickets.map((ticket) => ({
            ...ticket,
            isOwner: isOwner(user, ticket),
        })),

        metadata: {
            count,
            hasNextPage: count > skip + take
        }
    }
}
