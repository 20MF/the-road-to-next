"use client"
import {Input} from "@/components/ui/input";
import React from "react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

export type SearchInputProps = {
    placeholder: string
}
const SearchInput = ({placeholder}: SearchInputProps) => {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const {replace} = useRouter()

    const handeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const params = new URLSearchParams(searchParams)

        // console.log("params", params)
        if (value) {
            params.set("search", value)
        } else {
            params.delete("search")
        }

        // console.log("path:", `${pathName}?${params.toString()}`)
        replace(`${pathName}?${params.toString()}`, {
            scroll: false
        })

    }

    return (
        <Input placeholder={placeholder} onChange={handeSearch}/>
    )
}

export {SearchInput}