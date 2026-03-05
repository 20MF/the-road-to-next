import {resolve} from "dns";
import {Ticket} from "@/features/types";
import {initialTickets} from "@/data";

export const getTickets = async (): Promise<Ticket[]> => {
    new Promise(resolve => setTimeout(resolve, 2000))

    return new Promise((resolve) => {
        resolve(initialTickets)
    })
}