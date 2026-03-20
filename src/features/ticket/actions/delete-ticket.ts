"use server"

import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {ticketsPath} from "@/paths";
import {revalidatePath} from "next/cache";
import {setCookieByKey} from "@/actions/cookies";
import {FromErrorToAction} from "@/components/form/utlis/to-action-state";

const deleteTicket = async (id: string) => {
    try {
        await prisma.ticket.delete({
            where: {
                id
            }
        })
    }catch (error) {
        return FromErrorToAction (error)
    }

    //方法3、按需验证缓存,当需要跳转前,先验证
    revalidatePath(ticketsPath())
    await setCookieByKey("toast","Ticket deleted")
    redirect(ticketsPath())
}

export {deleteTicket}