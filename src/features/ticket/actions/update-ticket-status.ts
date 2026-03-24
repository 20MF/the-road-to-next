"use server"
import {TicketStatus} from "@/generated/prisma/enums";
import {revalidatePath} from "next/cache";
import {ticketsPath} from "@/paths";
import {FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {prisma} from "@/lib/prisma";
import {getAuthOrRedirect} from "@/features/auth/queries/get-auth-or-redirect";
import {isOwner} from "@/features/auth/utils/is-owner";

export const updateTicketStatus = async (id:string, status:TicketStatus) => {
    const {user} = await getAuthOrRedirect()

    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id
            }
        })

        if (!ticket || !isOwner(user, ticket)) {
            return toActionState("ERROR", "Not authorized.")
        }

        await prisma.ticket.update({
                where: {
                    id
                },
                data: {
                    status
                }
            }
        )
    } catch (error) {
        return FromErrorToAction(error)
    }
    revalidatePath(ticketsPath())

    return toActionState("SUCCESS", "Status Update")
}