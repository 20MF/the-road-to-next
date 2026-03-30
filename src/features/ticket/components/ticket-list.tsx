import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";
import {Placeholder} from "@/components/placeholder";
import {ParsedSearchParams} from "@/features/ticket/search-params";
import {TicketSearchInput} from "@/features/ticket/components/ticket-search-input";
import {TicketSortSelect} from "@/features/ticket/components/ticket-sort-select";
import {TicketPagination} from "@/features/ticket/components/ticket-pagination";

/**
 * useQueryState工作流程:
 * 1、Page-》Ticket-list-》ticket,加载默认值
 * 2、通过SearchInput、或者SortSelect ,获取查询、排序数据
 * 3、通过useQueryState获取查询或排序参数,更新URL状态
 * 4、Ticket-list组件,提交查询或排序参数
 * 5、再次渲染组件,获取查询数据
 */

type TicketListProps = {
    userId?: string | StringFilter<"Ticket"> | undefined
    searchParams: ParsedSearchParams
}
/**
 * 中介模式:
 * 同事对象不再直接相互通信，而是将请求发送给中介者。中介者根据请求内容和当前状态，
 * 决定如何响应或转发给其他同事对象。通过这种方式，可以将复杂的一对多关系转化为一对一关系，
 * 降低系统复杂度，提高可维护性
 */

const TicketList = async ({userId, searchParams}: TicketListProps) => {
    const {list: tickets, metadata: ticketMetadata} = await getTickets(userId, searchParams)
    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
            <div className="w-full max-w-[420px] flex gap-x-2">
                <TicketSearchInput placeholder={"Search tickets ..."}/>
                <TicketSortSelect
                    options={[
                        {sortKey: "createdAt", sortValue: "desc", label: "Newest",},
                        {sortKey: "createdAt", sortValue: "asc", label: "Oldest",},
                        {sortKey: "bounty", sortValue: "desc", label: "Bounty",}
                    ]}
                />
            </div>
            {tickets.length ? (
                tickets.map((ticket) => (
                    <TicketItem ticket={ticket}
                                key={ticket.id}
                                isDetail={false}/>
                ))) : (
                <Placeholder label="No tickets found"/>
            )}

            <div className="w-full max-x-[420px]">
                <TicketPagination paginatedTicketMetadata={ticketMetadata}/>
            </div>
        </div>
    )
}

export {TicketList}