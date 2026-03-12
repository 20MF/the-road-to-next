"use server"

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {ticketPath, ticketsPath} from "@/paths";
import {redirect} from "next/navigation";
import {z} from "zod";
import {FromErrorToAction} from "@/components/form/utlis/to-action-state";

// 验证form传入的字段
const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1)
})

// 在form中id作为第一个参数传入,此处直接引用,formData作为第二参数

// useActionState 的函数被调用时，
// 会多传入一个代表 state 的上一个值或初始值的参数作为该函数的第一个参数
// 就是此处的_actionSatate
const UpsertTicket = async (id: string,
                            _actionState: { message: string, payload?: FormData },
                            formData: FormData) => {

    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title") as string,
            content: formData.get("content") as string
        })

        // 根据传入id是否为空,来判断updata,还是create
        await prisma.ticket.upsert({
            where: {
                id: id || "",
            },
            update: data,
            create: data
        })
    } catch (error) {
        return FromErrorToAction(error, formData)
    }

    revalidatePath(ticketsPath())
    if (id) {
        redirect(ticketPath(id))
    }

    return {message: "Ticket created", fieldErrors: {}}
}
export {UpsertTicket}