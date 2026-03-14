"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ticketEditPath, ticketPath} from "@/paths";
import {TICKET_ICONS} from "@/features/constants";
import {LucideSquareArrowOutUpRight, LucideTrash, LucidePencil} from "lucide-react";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import {deleteTicket} from "@/features/ticket/actions/delete-ticket";
import {toCurrencyFromCent} from "@/utils/currency";

type TicketProps = {
    ticket:
        | Awaited<ReturnType<typeof getTickets>>[number]
        | Awaited<ReturnType<typeof getTicket>>
    isDetail: boolean
}
const TicketItem = ({
                        ticket,
                        isDetail
                    }: TicketProps
) => {
    const detailButton = (
        <Button variant="ghost" size="icon" asChild>
            <Link prefetch href={ticketPath(ticket!.id)}>
                <LucideSquareArrowOutUpRight className="h-4 w-4"/>
            </Link>
        </Button>
    )

    const editButton = (
        <Button variant="ghost" size="icon" asChild>
            <Link prefetch href={ticketEditPath(ticket!.id)}>
                <LucidePencil className="h-4 w-4"/>
            </Link>
        </Button>
    )

    const deleteButton = (
        // 去掉onclic事件,通过form的action属性,bind第二参数,就能把客户端编译,移到服务器端
        <form action={deleteTicket.bind(null, ticket!.id)}>
            <Button variant="ghost" size="icon">
                <LucideTrash className="h-4 w-4"/>
            </Button>
        </form>
    )
    return (
        /*clsx 能通过函数引入判断条件,修改样式*/
        <div className={clsx("w-full  flex gap-x-1 ", {
            "max-w-[580px]": isDetail,
            "max-w-[420px]": !isDetail,
        })}>
            <Card key={ticket!.id} className="w-full border-none">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>{TICKET_ICONS[ticket!.status]}</span>
                        <span className="truncate">{ticket!.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={clsx("whitespace-break-spaces", {"line-clamp-3": !isDetail})}>
                        {ticket!.content}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">{ticket!.deadline}</p>
                    <p className="text-sm text-muted-foreground">
                        {toCurrencyFromCent(ticket!.bounty)}
                    </p>
                </CardFooter>
            </Card>
            <div className="flex flex-col gap-x-1">
                {isDetail ? (
                    <>
                        {editButton}
                        {deleteButton}
                    </>
                ) : (
                    <>
                        {editButton}
                        {detailButton}
                    </>
                )}
            </div>
        </div>
    )
}

export {TicketItem}