"use client"
import {useQueryState, useQueryStates} from "nuqs";
import {paginationOption, paginationParser, searchParser} from "@/features/ticket/search-params";
import {Pagination} from "@/components/pagination";
import {useEffect, useRef} from "react";
import {search} from "effect/String";

type TicketPaginationProps = {
    paginatedTicketMetadata: {
        count: number
        hasNextPage: boolean
    }
}

const TicketPagination = ({paginatedTicketMetadata}: TicketPaginationProps) => {
    const [pagination, setPagination] = useQueryStates(paginationParser, paginationOption)

    const [search] = useQueryState("search", searchParser)
    const prevSearch = useRef(search)

    //每当查询结果后,重新归零分页
    useEffect(() => {
        if (search === prevSearch.current) return
        prevSearch.current = search
        setPagination({...pagination, page: 0})

    }, [search, pagination, setPagination]);

    return <Pagination
        pagination={pagination}
        onPagination={setPagination}
        paginatedMetadata={paginatedTicketMetadata}
    />
}

export {TicketPagination}