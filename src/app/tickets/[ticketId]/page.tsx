import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {notFound} from "next/navigation";
import {RedirectToast} from "@/components/redirect-toast";

export type TicketProps = {
    params: Promise<{
        ticketId: string
    }>
}
const TicketPage = async ({params}: TicketProps) => {
    const {ticketId} =await params
    const ticket = await getTicket(ticketId)

    if (!ticket) {
        return notFound()
    }

    return (
        <>
            <div className="flex justify-center animate-fade-from-top">
                <TicketItem ticket={ticket} isDetail={true}/>
            </div>
            <RedirectToast/>
        </>
    )
}

export default TicketPage