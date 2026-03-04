import {initialTickets} from "@/data";
import Link from "next/link";
import {ticketPath} from "@/paths";
import clsx from "clsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {LucideFileCheck, LucideFileText, LucidePencil} from "lucide-react";

const TICKET_ICONS = {
    OPEN: <LucideFileText />,
    DONE: <LucideFileCheck />,
    IN_PROGRESS: <LucidePencil />
}

const TicketsPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
                <p className="text-sm text-muted-foreground">
                    All your tickets at one place
                </p>
            </div>
            <Separator/>
            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
                {
                    initialTickets.map((ticket) => (
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
                    ))
                }
            </div>
        </div>
    )
}

export default TicketsPage