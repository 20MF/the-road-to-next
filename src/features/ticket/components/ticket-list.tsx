import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";
import {SearchInput} from "@/components/search-input";
import {SearchParams} from "@/features/ticket/search-params";
import {Placeholder} from "@/components/placeholder";

type TicketListProps = {
    userId?: string | StringFilter<"Ticket"> | undefined
    searchParams: SearchParams
}

const TicketList = async ({userId, searchParams}: TicketListProps) => {
    const tickets = await getTickets(userId, searchParams)
    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
            <div className="w-full max-w-[420px]">
                <SearchInput placeholder={"Search tickets ..."}/>
            </div>
            {tickets.length ? (
                tickets.map((ticket) => (
                    <TicketItem ticket={ticket}
                                key={ticket.id}
                                isDetail={false}/>
                ))) : (
                <Placeholder label="No tickets found"/>
            )}
        </div>
    )
}

export {TicketList}