import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ticketPath} from "@/paths";
import {TICKET_ICONS} from "@/features/constants";
import {Ticket} from "@/features/types";

type TicketProps = {
    ticket: Ticket
}
const TicketItem = ({ticket}: TicketProps) => {
    return (
        <Card key={ticket.id} className="w-full max-w-[420px] ">
            <CardHeader>
                <CardTitle className="flex gap-x-2">
                    <span>{TICKET_ICONS[ticket.status]}</span>
                    <span className="truncate">{ticket.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/*clsx 能通过函数引入判断条件,修改样式*/}
                <p className="text-sm text-slate-500 truncate">
                    {ticket.content}
                </p>
            </CardContent>
            <CardFooter>
                <Link href={ticketPath(ticket.id)} className="text-sm underline">
                    view
                </Link>
            </CardFooter>
        </Card>
    )
}

export {TicketItem}