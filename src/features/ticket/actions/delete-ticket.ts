"use server"

import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {ticketsPath} from "@/paths";

const deleteTicket = async (id: string) => {
    await prisma.ticket.delete({
        where: {
            id
        }
    })
    redirect(ticketsPath())
}

export {deleteTicket}