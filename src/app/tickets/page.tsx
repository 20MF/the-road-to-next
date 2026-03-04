import {initialTickets} from "@/data";
import {Separator} from "@/components/ui/separator";
import Heading from "@/components/heading";
import {TicketItem} from "@/features/ticket/components/ticket-item";


const TicketsPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place"/>

            <Separator/>
            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
                {
                    initialTickets.map((ticket) => (
                        <TicketItem ticket={ticket} key={ticket.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default TicketsPage