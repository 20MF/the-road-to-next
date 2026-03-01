import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {initialTickets} from "@/data";
import Link from "next/link";
import {ticketPath} from "@/paths";

const TICKET_ICONS={
  OPEN:"O",
  DONE:"X",
  IN_PROGRESS:">"
}

const TicketsPage = () => {
  return (
    <div>
      {
        initialTickets.map((ticket) => (
          <div key={ticket.id}>
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h2 className="text-lg">{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)}>view</Link>
          </div>
        ))
      }
    </div>
  )
}

export default TicketsPage