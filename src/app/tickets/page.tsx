// "use client"

import {Separator} from "@/components/ui/separator";
import Heading from "@/components/heading";
import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import {Suspense} from "react";
import {TicketList} from "@/features/ticket/components/ticket-list";
import {Spinner} from "@/features/ticket/components/spinner";
import {ErrorBoundary} from "react-error-boundary";
import {Placeholder} from "@/components/placeholder";

// 只有在服务器端组件中才能通过异步操作直接获取数据,客户端组件不能如此操作
const TicketsPage = async () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place"/>
            <ErrorBoundary fallback={<Placeholder label="Something went wrong!"/>}>
                <Suspense fallback={<Spinner/>}>
                    <TicketList/>
                </Suspense>
            </ErrorBoundary>

        </div>
    )
}

export default TicketsPage