// "use client"

import Heading from "@/components/heading";
import {Suspense} from "react";
import {TicketList} from "@/features/ticket/components/ticket-list";
import {Spinner} from "@/app/tickets/[ticketId]/spinner";
import {ErrorBoundary} from "react-error-boundary";
import {Placeholder} from "@/components/placeholder";
import {CardCompact} from "@/components/card-compact";
import {TicketUpsertForm} from "@/features/ticket/components/ticket-upsert-form";

// 方法1、强制把页面改成动态,跟着数据库变化而变化
// export const dynamic="force-dynamic"

// 方法2、页面依然是静态页面,通过设置缓存验证刷新时间,来同步静态页面和数据库数据
// export const revalidate = 30     //增量静态

// 只有在服务器端组件中才能通过异步操作直接获取数据,客户端组件不能如此操作
const TicketsPage = async () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place"/>

            <CardCompact title="Create Ticket"
                         content={<TicketUpsertForm/>}
                         className="w-full max-w-[420px] self-center"
                         description="A new ticket will be created"
            />

            <ErrorBoundary fallback={<Placeholder label="Something went wrong!"/>}>
                <Suspense fallback={<Spinner/>}>
                    <TicketList/>
                </Suspense>
            </ErrorBoundary>

        </div>
    )
}

export default TicketsPage