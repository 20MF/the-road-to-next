import {CardCompact} from "@/components/card-compact";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {notFound} from "next/navigation";
import {TicketUpdateForm} from "@/features/ticket/components/ticket-update-form";

type TicketEditPageProps = {
    params: {
        ticketId: string
    }
}
const TicketEditPage =async ({params}: TicketEditPageProps) => {
    const ticket=await getTicket(params.ticketId)

    if (!ticket){
        notFound()
    }
    return (
        <div className="flex flex-1 flex-col justify-center items-center">
            <CardCompact title="Edit Ticket"
                         content={<TicketUpdateForm ticket={ticket}/> }
                         description="Edit an existing ticket"/>
        </div>
    )
}
export default TicketEditPage