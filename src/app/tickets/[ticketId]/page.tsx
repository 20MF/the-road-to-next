import {initialTickets} from "@/data";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {Placeholder} from "@/components/placeholder";
import Interceptors from "undici-types/interceptors";
import retry = Interceptors.retry;
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ticketsPath} from "@/paths";

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
        <div>
            <h2 className='text-lg'>{ticket.title}</h2>
            <h2 className='text-sm'>{ticket.content}</h2>
        </div>
    )
}

export default TicketPage