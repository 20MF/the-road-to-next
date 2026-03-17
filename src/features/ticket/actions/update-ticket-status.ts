"use server"
import {TicketStatus} from "@/generated/prisma/enums";
import {revalidatePath} from "next/cache";
import {ticketsPath} from "@/paths";
import {FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {prisma} from "@/lib/prisma";

export const updateTicketStatus = async (id:string, status:TicketStatus) => {
    try {
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