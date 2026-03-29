import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import {StringFilter} from "../../../../generated/prisma/commonInputTypes";
import {SearchInput} from "@/components/search-input";
import {Placeholder} from "@/components/placeholder";
import {SortSelect} from "@/components/sort-select";
import {ParsedSearchParams} from "@/features/ticket/search-params";

type TicketListProps = {
    userId?: string | StringFilter<"Ticket"> | undefined
    searchParams: ParsedSearchParams
}
/*   useQueryState工作流程:
* 1、Page-》Ticket-list-》ticket,加载默认值
* 2、通过SearchInput、或者SortSelect ,获取查询、排序数据
* 3、通过useQueryState获取查询或排序参数,更新URL状态
* 4、Ticket-list组件,提交查询或排序参数
* 5、再次渲染组件,获取查询数据
* */

const TicketList = async ({userId, searchParams}: TicketListProps) => {
    const tickets = await getTickets(userId, searchParams)
    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
            <div className="w-full max-w-[420px] flex gap-x-2">
                <SearchInput placeholder={"Search tickets ..."}/>
                <SortSelect
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
        </div>
    )
}

export {TicketList}