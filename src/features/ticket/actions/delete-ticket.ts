"use server"

import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {ticketsPath} from "@/paths";
import {revalidatePath} from "next/cache";
import {setCookieByKey} from "@/actions/cookies";
import {FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {isOwner} from "@/features/auth/utils/is-owner";
import {getAuthOrRedirect} from "@/features/auth/queries/get-auth-or-redirect";

const deleteTicket = async (id: string) => {
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

        await prisma.ticket.delete({
            where: {
                id
            }
        })
    } catch (error) {
        return FromErrorToAction(error)
    }

    //方法3、按需验证缓存,当需要跳转前,先验证
    revalidatePath(ticketsPath())
    await setCookieByKey("toast", "Ticket deleted")
    redirect(ticketsPath())
}

export {deleteTicket}