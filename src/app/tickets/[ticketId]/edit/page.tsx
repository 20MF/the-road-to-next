import {CardCompact} from "@/components/card-compact";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {notFound} from "next/navigation";
import {TicketUpsertForm} from "@/features/ticket/components/ticket-upsert-form";
import {Separator} from "@/components/ui/separator";
import {homePath, ticketPath} from "@/paths";
import {Breadcrumb} from "@/components/ui/breadcrumb";
import {RedirectToast} from "@/components/redirect-toast";


type TicketEditPageProps = {
    params: Promise<{
        ticketId: string
    }>
}
const TicketEditPage = async ({params}: TicketEditPageProps) => {
    const {ticketId} = await params
    const ticket = await getTicket(ticketId)

    if (!ticket) {
        notFound()
    }
    return (
        <>
            <div className="flex flex-1 flex-col justify-center items-center">
                <CardCompact title="Edit Ticket"
                             className="w-full max-w-[420px] animate-fade-from-top"
                             content={<TicketUpsertForm ticket={ticket}/>}
                             description="Edit an existing ticket"/>
            </div>
            <RedirectToast/>
        </>
    )
}
export default TicketEditPage