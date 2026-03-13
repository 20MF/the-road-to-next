import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTicket} from "@/features/ticket/queries/get-ticket";

export type TicketProps = {
    params: {
        ticketId: string
    }
}
const TicketPage = async ({params}: TicketProps) => {
    const ticket = await getTicket(params.ticketId)

    if (!ticket) {
        return null
    }

    return (
        <div className="flex justify-center">
            <TicketItem ticket={ticket} isDetail={true}/>
        </div>
    )
}

export default TicketPage