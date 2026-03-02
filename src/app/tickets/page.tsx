import {initialTickets} from "@/data";
import Link from "next/link";
import {ticketPath} from "@/paths";
import clsx from "clsx";

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
          <div key={ticket.id} className="w-full max-w-[420px] p-4 border rounded">
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h3 className="text-lg truncate">{ticket.title}</h3>
            {/*clsx 能通过函数引入判断条件,修改样式*/}
            <p className={clsx("text-sm text-slate-500 truncate",{
              "line-through":ticket.status==='DONE'
            })}>
              {ticket.content}

            </p>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              view
            </Link>
          </div>
        ))
      }
    </div>
   </div>
  )
}

export default TicketsPage