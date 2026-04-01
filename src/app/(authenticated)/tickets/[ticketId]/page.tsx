import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {notFound} from "next/navigation";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {homePath, ticketPath} from "@/paths";
import {getComments} from "@/features/comment/queries/get-comments";
import {Comments} from "@/features/comment/components/comments";

export type TicketProps = {
    params: Promise<{
        ticketId: string
    }>
}

/**
 * 通过Promise.all把两个顺序请求,并行处理,提升应用性能
 */
const TicketPage = async ({params}: TicketProps) => {
    const {ticketId} = await params
    const ticketPromise = getTicket(ticketId)
    const commentsPromise = getComments(ticketId)

    const [ticket, comments] = await Promise.all([ticketPromise, commentsPromise])

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
                <TicketItem ticket={ticket}
                            isDetail
                            comments={<Comments ticketId={ticket.id} comments={comments}/>}/>
            </div>
        </>
    )
}

export default TicketPage