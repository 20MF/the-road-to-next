import {initialTickets} from "@/data";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";

export type TicketProps = {
  params: {
    ticketId: string
  }
}
const TicketPage = ({params}: TicketProps) => {
  const ticket = initialTickets.find(ticket => (ticket.id === params.ticketId))

  if (!ticket) return <div>data not found!</div>
  return (
    <div>
      <h2 className='text-lg'>{ticket.title}</h2>
      <h2 className='text-sm'>{ticket.content}</h2>
    </div>
  )
}

export default TicketPage