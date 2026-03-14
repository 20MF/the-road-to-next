"use server"

import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {ticketsPath} from "@/paths";
import {revalidatePath} from "next/cache";
import {setCookieByKey} from "@/actions/cookies";

const deleteTicket = async (id: string) => {
    await prisma.ticket.delete({
        where: {
            id
        }
    })

    //方法3、按需验证缓存,当需要跳转前,先验证
    revalidatePath(ticketsPath())
    await setCookieByKey("toast","Ticket deleted")
    redirect(ticketsPath())
}

export {deleteTicket}