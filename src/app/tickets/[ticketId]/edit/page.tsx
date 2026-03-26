import {CardCompact} from "@/components/card-compact";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {notFound} from "next/navigation";
import {TicketUpsertForm} from "@/features/ticket/components/ticket-upsert-form";
import {isOwner} from "@/features/auth/utils/is-owner";
import {getAuth} from "@/features/auth/queries/get-auth";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {homePath, ticketPath} from "@/paths";

type TicketEditPageProps = {
    params: Promise<{
        ticketId: string
    }>
}
const TicketEditPage = async ({params}: TicketEditPageProps) => {
    const {user} = await getAuth()
    const {ticketId} = await params
    const ticket = await getTicket(ticketId)

    const isTicketFound = !!ticket
    const isTicketOwner = isOwner(user, ticket)

    if (!isTicketFound || !isTicketOwner) {
        notFound()
    }
    return (
        <>
            <div className="flex flex-1 flex-col gap-8">
                <Breadcrumbs breadcrumbs={[
                    {title: "Tickets", href: homePath()},
                    {title: ticket.title, href: ticketPath(ticket.id)},
                    {title: "Edit"}
                ]}/>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center">
                <CardCompact title="Edit Ticket"
                             className="w-full max-w-[420px] animate-fade-from-top"
                             content={<TicketUpsertForm ticket={ticket}/>}
                             description="Edit an existing ticket"/>
            </div>
        </>
    )
}
export default TicketEditPage