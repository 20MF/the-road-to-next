"use server"
import {prisma} from "@/lib/prisma";
import {getAuth} from "@/features/auth/queries/get-auth";
import {isOwner} from "@/features/auth/utils/is-owner";

export const getComments = async (ticketId: string, cursor?:string) => {
    const {user} = await getAuth()

    const where = {
        ticketId,
        // createdAt: {
        //     lt:cursor?new Date(cursor):undefined
        // }
        id:{
            lt:cursor
        },
    }

    const take = 2
    const hasNextPage=true
    const [comments, count] = await prisma.$transaction([
            prisma.comment.findMany({
                where,
                take,
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                },
                orderBy:
                    [{"createdAt": "desc"},{id:"desc"}]

            }),

            prisma.comment.count({
                where,
            })
        ]
    )


    return {
        list: comments.map(comment => ({
            ...comment,
            isOwner: isOwner(user, comment)
        })),
        metadata: {
            count,
            hasNextPage,
            cursor:comments.at(-1)?.id.valueOf(),
        }
    }
}