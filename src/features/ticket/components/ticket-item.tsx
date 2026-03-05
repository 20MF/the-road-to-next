import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ticketPath} from "@/paths";
import {TICKET_ICONS} from "@/features/constants";
import {Ticket} from "@/features/types";
import {LucideSquareArrowOutUpRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";

type TicketProps = {
    ticket: Ticket,
    isDetail: boolean
}
const TicketItem = ({ticket, isDetail}: TicketProps) => {
    const detailButton = (
        <Button variant="ghost" size="icon" asChild>
            <Link href={ticketPath(ticket.id)}>
                <LucideSquareArrowOutUpRight className="h-4 w-4"/>
            </Link>
        </Button>
    )
    return (
        /*clsx 能通过函数引入判断条件,修改样式*/
        <div className={clsx("w-full  flex gap-x-1 ", {
            "max-w-[580px]": isDetail,
            "max-w-[420px]": !isDetail,
        })}>
            <Card key={ticket.id} className="w-full border-none">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>{TICKET_ICONS[ticket.status]}</span>
                        <span className="truncate">{ticket.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={clsx("whitespace-break-spaces", {"line-clamp-3": !isDetail})}>
                        {ticket.content}
                    </p>
                </CardContent>
            </Card>
            {isDetail ? null : <div className="flex flex-col gap-x-1">{detailButton}</div>}
        </div>
    )
}

export {TicketItem}