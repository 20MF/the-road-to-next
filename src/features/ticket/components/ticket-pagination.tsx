"use client"
import {useQueryStates} from "nuqs";
import {paginationOption, paginationParser} from "@/features/ticket/search-params";
import {Pagination} from "@/components/pagination";

type TicketPaginationProps = {
    paginatedTicketMetadata: {
        count: number
        hasNextPage: boolean
    }
}

const TicketPagination = ({paginatedTicketMetadata}: TicketPaginationProps) => {
    const [pagination, setPagination] = useQueryStates(paginationParser, paginationOption)

    return <Pagination
        pagination={pagination}
        onPagination={setPagination}
        paginatedMetadata={paginatedTicketMetadata}
    />
}

export {TicketPagination}