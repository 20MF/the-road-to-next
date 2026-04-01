// "use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ticketEditPath, ticketPath} from "@/paths";
import {TICKET_ICONS} from "@/features/constants";
import {LucideSquareArrowOutUpRight, LucidePencil, LucideEllipsisVertical} from "lucide-react";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {toCurrencyFromCent} from "@/utils/currency";
import {TicketMoreMenu} from "@/features/ticket/components/ticket-more-menu";
import {TicketWithMetadata} from "@/features/ticket/types";
import {Comments} from "@/features/comment/components/comments";
import {CommentWithMetadata} from "@/features/comment/types";
import React from "react";

type TicketProps = {
    ticket: TicketWithMetadata
    isDetail: boolean
    comments?: React.ReactNode
}

/**
 * 有时需要把组件定义成客户端组件,客户端组件具有状态值和交互的特征
 *
 * 当组件中出现数据请求时,它只能是服务器端组件
 *
 * 通过请求前置到action层,使服务器端组件变成客户端组件
 *
 * 下例把isOwner定义到getTcikets中,作为ticket的属性
 * 成功的前置请求
 *
 * ** 注意事项: 当一个组件标记为use client ,那么它的子组件也必须是客户端组件,否则会报错
 */

const TicketItem = ({ticket, isDetail, comments}: TicketProps
) => {
    const detailButton = (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketPath(ticket!.id)}>
                <LucideSquareArrowOutUpRight className="h-4 w-4"/>
            </Link>
        </Button>
    )

    const editButton = ticket.isOwner ? (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketEditPath(ticket!.id)}>
                <LucidePencil className="h-4 w-4"/>
            </Link>
        </Button>
    ) : null

    const moreMenu = ticket.isOwner ? (<TicketMoreMenu
        ticket={ticket}
        trigger={
            <Button variant="outline" size="icon">
                <LucideEllipsisVertical className="w-4 h-4"/>
            </Button>
        }
    />) : null

    return (
        /*clsx 能通过函数引入判断条件,修改样式*/
        <div className={clsx("w-full  flex-col gap-x-4 ", {
            "max-w-[580px]": isDetail,
            "max-w-[420px]": !isDetail,
        })}>
            <div className="flex gap-x-2">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex gap-x-2">
                            <span>{TICKET_ICONS[ticket.status]}</span>
                            <span className="truncate">{ticket!.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={clsx("whitespace-break-spaces", {"line-clamp-3": !isDetail})}>
                            {ticket!.content}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                            {ticket!.deadline} by {ticket.user.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {toCurrencyFromCent(ticket!.bounty)}
                        </p>
                    </CardFooter>
                </Card>

                <div className="flex flex-col gap-x-1">
                    {isDetail ? (
                        <>
                            {editButton}
                            {moreMenu}
                        </>
                    ) : (
                        <>
                            {editButton}
                            {detailButton}
                        </>
                    )}
                </div>
            </div>
            {/*{isDetail ?*/}
            {/*    <Comments ticketId={ticket.id} comments={comments}/> : null}*/}
            {comments}
        </div>
    )
}

export {TicketItem}