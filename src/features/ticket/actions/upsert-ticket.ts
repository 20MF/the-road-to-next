"use server"

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {ticketPath, ticketsPath} from "@/paths";
import {redirect} from "next/navigation";

// 在form中id作为第一个参数传入,此处直接引用,formData作为第二参数
const UpsertTicket = async (id: string, formData: FormData) => {
    const data = {
        title: formData.get("title") as string,
        content: formData.get("content") as string
    }
    // 根据传入id是否为空,来判断updata,还是create
    await prisma.ticket.upsert({
        where: {
            id: id || "",
        },
        update: data,
        create: data
    })
    revalidatePath(ticketsPath())
    if (id) {
        redirect(ticketPath(id))
    }
}
export {UpsertTicket}