"use server"

import {prisma} from "../../../../prisma/lib/prisma";
import {revalidatePath} from "next/cache";
import {ticketsPath} from "@/paths";

const CreateTicket = async (formData: FormData) => {
    const data = {
        title: formData.get("title"),
        content: formData.get("content")
    }
    await prisma.ticket.create({
        data: {
            title: data.title as string,
            content: data.content as string
        }
    })
    revalidatePath(ticketsPath())
}

export {CreateTicket}