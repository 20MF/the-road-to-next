"use client"
import {Input} from "@/components/ui/input";
import React from "react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export type SearchInputProps = {
    placeholder: string
}

/* 1、获取初始查询状态字符串,赋值给URLSearchParams
    2、通过event事件,replace不断替换路由地址
 3、replace会传递给useSearchParams更新URL地址栏*/

const SearchInput = ({placeholder}: SearchInputProps) => {
    //获取URL当前查询值,管理URL地址栏状态更新
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const {replace} = useRouter()

    // console.log("params", searchParams.get("search"))

    const handeSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        //赋予
        const params = new URLSearchParams(searchParams)


        if (value) {
            params.set("search", value)
        } else {
            params.delete("search")
        }

        //会影响useSearchParams更新URL
        replace(`${pathName}?${params.toString()}`, {
            scroll: false
        })

    }, 250)

    return (
        <Input placeholder={placeholder} onChange={handeSearch}/>
    )
}

export {SearchInput}