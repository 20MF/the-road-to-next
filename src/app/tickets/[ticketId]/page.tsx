import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {notFound} from "next/navigation";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {homePath, ticketPath} from "@/paths";

export type TicketProps = {
    params: Promise<{
        ticketId: string
    }>
}
const TicketPage = async ({params}: TicketProps) => {
    const {ticketId} = await params
    const ticket = await getTicket(ticketId)

    if (!ticket) {
        return notFound()
    }

    return (
        <>
            <div className="flex flex-1 flex-col gap-8">
                <Breadcrumbs breadcrumbs={[
                    {title: "Tickets", href: homePath()},
                    {title: ticket.title},
                ]}/>
            </div>
            <div className="flex justify-center animate-fade-from-top">
                <TicketItem ticket={ticket} isDetail />
            </div>
        </>
    )
}

export default TicketPage