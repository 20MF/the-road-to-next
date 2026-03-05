"use client"

import {initialTickets} from "@/data";
import {Separator} from "@/components/ui/separator";
import Heading from "@/components/heading";
import {TicketItem} from "@/features/ticket/components/ticket-item";
import {useEffect, useState} from "react";
import {Ticket} from "@/features/types";
import {getTicket} from "@/features/ticket/queries/get-ticket";

const TicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const fetchTickets = async () => {
        const result = await getTicket()
        setTickets(result)
    }
    useEffect(() => {
        fetchTickets()
    }, []);
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place"/>

            <Separator/>
            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
                {
                    tickets.map((ticket) => (
                        <TicketItem ticket={ticket} key={ticket.id} isDetail={false}/>
                    ))
                }
            </div>
        </div>
    )
}

export default TicketsPage