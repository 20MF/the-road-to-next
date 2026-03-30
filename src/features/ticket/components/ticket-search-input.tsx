"use client"
import {useQueryState} from "nuqs";
import {searchParser} from "@/features/ticket/search-params";
import React from "react";
import {SearchInput} from "@/components/search-input";

export type SearchInputProps = {
    placeholder: string
}
const TicketSearchInput = ({placeholder}:SearchInputProps) => {
    const [search,setSearch] = useQueryState("search",searchParser)

    return (
        <SearchInput placeholder={placeholder}
               onChange={setSearch}
               value={search}
        />
    )
}

export {TicketSearchInput}