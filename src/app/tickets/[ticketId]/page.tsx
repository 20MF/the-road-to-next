import {initialTickets} from "@/data";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {Placeholder} from "@/components/placeholder";
import Interceptors from "undici-types/interceptors";
import retry = Interceptors.retry;
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ticketsPath} from "@/paths";
import {TicketItem} from "@/features/ticket/components/ticket-item";

export type TicketProps = {
    params: {
        ticketId: string
    }
}
const TicketPage = ({params}: TicketProps) => {
    const ticket = initialTickets.find(ticket => (ticket.id === params.ticketId))

    if (!ticket) {
        return (
            <div className="flex-1 flex items-center">
                <Placeholder label="Ticket not found" button={
                    <Button asChild variant="outline">
                        <Link href={ticketsPath()}>Go to Tickets</Link>
                    </Button>
                }/>
            </div>
        )
    }
    return (
        <div className="flex justify-center">
          <TicketItem ticket={ticket} isDetail={true}/>
        </div>
    )
}

export default TicketPage