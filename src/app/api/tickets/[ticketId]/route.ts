import {getTicket} from "@/features/ticket/queries/get-ticket";

type ticketIdProps = {
    params: Promise<{ ticketId: string }>
}
export const GET = async (_request: Request, {params}: ticketIdProps) => {
    const {ticketId} = await params
    const ticket = await getTicket(ticketId)

    return Response.json(ticket)
}