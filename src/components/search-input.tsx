"use client"
import {Input} from "@/components/ui/input";
import React from "react";
import {useDebouncedCallback} from "use-debounce";
import {useQueryState, useQueryStates} from "nuqs";
import {searchParser} from "@/features/ticket/search-params";

export type SearchInputProps = {
    placeholder: string
}

const SearchInput = ({placeholder}: SearchInputProps) => {
    const [search,setSearch] = useQueryState("search",searchParser)

    const handeSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
       setSearch(event.target.value)
    }, 250)

    return (
        <Input placeholder={placeholder}
               onChange={handeSearch}
               defaultValue={search}
        />
    )
}

export {SearchInput}