// "use client"

import Heading from "@/components/heading";
import {Suspense} from "react";
import {TicketList} from "@/features/ticket/components/ticket-list";
import {Spinner} from "@/app/(authenticated)/tickets/[ticketId]/spinner";
import {ErrorBoundary} from "react-error-boundary";
import {Placeholder} from "@/components/placeholder";
import {CardCompact} from "@/components/card-compact";
import {TicketUpsertForm} from "@/features/ticket/components/ticket-upsert-form";
import {getAuth} from "@/features/auth/queries/get-auth";
import { searchParamsCache} from "@/features/ticket/search-params";
import {SearchParams} from "nuqs";

/*
* 查询、排序流程说明
* 第一次渲染
* 1、TicketPage、TicketList组件,作为服务器组件传送给客户端
* 2、客户端渲染服务器端传来代码
* 3、当执行查询功能、或者排序功能时,useSearchParam钩子会更新replace传入的查询字符串
* 第二次渲染
* 4、TicketPage组件searchParams参数,会接收useSerchParam更新
* 5、向数据库发送查询请求
* 6、传回数据,再次渲染页面
* */
type TicketPageProps={
    searchParams:Promise<SearchParams>
}

const TicketsPage = async ({searchParams}:TicketPageProps) => {
    const {user} =await getAuth()

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place"/>

            <CardCompact title="Create Ticket"
                         content={<TicketUpsertForm/>}
                         className="w-full max-w-[420px] self-center"
                         description="A new ticket will be created"
            />

            <ErrorBoundary fallback={<Placeholder label="Something went wrong!"/>}>
                {/*//显示部分票据*/}
                <Suspense fallback={<Spinner/>}>
                    <TicketList userId={user?.id}
                                searchParams={searchParamsCache.parse(await searchParams)}/>
                </Suspense>
            </ErrorBoundary>

        </div>
    )
}

export default TicketsPage