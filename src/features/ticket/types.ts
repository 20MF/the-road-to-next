 import {Prisma} from "../../../generated/prisma/client";

export const TicketWithMetadata = Prisma.TicketGetPayload<{
    include: {
        user: {
            select: {
                username: true
            }
        }
    }
}>

