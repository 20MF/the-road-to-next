"use server"

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {ticketPath, ticketsPath} from "@/paths";
import {redirect} from "next/navigation";
import {z} from "zod";
import {FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {setCookieByKey} from "@/actions/cookies";
import {toCent} from "@/utils/currency";

// 验证form传入的字段
const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
    bounty: z.coerce.number().positive(),
})

// useActionState 的函数被调用时，
// 会多传入一个代表 state 的上一个值或初始值的参数作为该函数的第一个参数
// 就是此处的_actionSatate
const UpsertTicket = async (id: string,
                            _actionState: { message: string, payload?: FormData },
                            formData: FormData
) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            deadline: formData.get("deadline"),
            bounty: formData.get("bounty")
        })

        const dbData={
            ...data,
            bounty:toCent(data.bounty)
        }

        // 根据传入id是否为空,来判断updata,还是create
        await prisma.ticket.upsert({
            where: {
                id: id || "",
            },
            update: dbData,
            create: dbData
        })
    } catch (error) {
        return FromErrorToAction(error, formData)
    }

    revalidatePath(ticketsPath())
    if (id) {
        await setCookieByKey("toast", "Ticket create")
        redirect(ticketPath(id))
    }

    return toActionState("SUCCESS", "ticket success create!")
}
export {UpsertTicket}