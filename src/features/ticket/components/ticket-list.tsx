import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";

type TicketListProps = {
    userId?: string | StringFilter<"Ticket"> | undefined
}

const TicketList = async ({userId}: TicketListProps) => {
    const tickets = await getTickets(userId)
    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
            {
                tickets.map((ticket) => (
                    <TicketItem ticket={ticket}
                                key={ticket.id}
                                isDetail={false}/>
                ))
            }
        </div>
    )
}

export {TicketList}