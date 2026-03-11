"use server"

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {ticketPath, ticketsPath} from "@/paths";
import {redirect} from "next/navigation";

// 在form中id作为第一个参数传入,此处直接引用,formData作为第二参数
const UpdateTicket = async (id: string, formData: FormData) => {
    const data = {
        title: formData.get("title"),
        content: formData.get("content")
    }
    await prisma.ticket.update({
        where: {
            id
        },
        data: {
            title: data.title as string,
            content: data.content as string
        }
    })
    revalidatePath(ticketsPath())
    redirect(ticketsPath())
}
export {UpdateTicket}