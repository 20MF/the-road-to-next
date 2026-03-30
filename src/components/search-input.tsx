"use client"
import {Input} from "@/components/ui/input";
import React from "react";
import {useDebouncedCallback} from "use-debounce";

export type SearchInputProps = {
    placeholder: string
    value: string
    onChange: (value: string) => void
}

const SearchInput = ({placeholder, onChange, value}: SearchInputProps) => {

    const handeSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, 250)

    return (
        <Input placeholder={placeholder}
               onChange={handeSearch}
               defaultValue={value}
        />
    )
}

export {SearchInput}