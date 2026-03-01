import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {initialTickets} from "@/data";
import Link from "next/link";

const TicketsPage = () => {
  return (
    <div>
      {
        initialTickets.map((ticket) => (
          <div>
            <h2 className="text-lg">{ticket.title}</h2>
            <Link href={`/tickets/${ticket.id}`}>view</Link>
          </div>
        ))
      }
    </div>
  )
}

export default TicketsPage