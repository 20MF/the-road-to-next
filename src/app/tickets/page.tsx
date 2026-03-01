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
   <div className="flex-1 flex flex-col gap-y-8">
     <div>
       <h2 className="text-3xl font-bold tracking-tight">TicketsPage</h2>
       <p className="text-sm text-muted-foreground">
         All your tickets at one place
       </p>
     </div>
    <div className="flex-1 flex flex-col items-center gap-y-4">
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
   </div>
  )
}

export default TicketsPage