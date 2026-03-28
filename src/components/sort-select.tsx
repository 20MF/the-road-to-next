"use client"
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type Option = {
    label: string
    value: string
}

type SortSelectProps = {
    defaultValue: string
    options: Option[]
}

const SortSelect = ({defaultValue, options}: SortSelectProps) => {
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const pathName = usePathname()

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams)

        if (value === defaultValue) {

            params.delete("sort")
        } else if (value) {
            params.set("sort", value)
        } else {
            params.delete("sort")
        }

        replace(`${pathName}?${params.toString()}`, {
            scroll: false
        })
    }
    return (
        <Select
            onValueChange={handleSort}
            defaultValue={searchParams.get("sort")?.toString() || defaultValue}
        >
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                {
                    options.map(option => (
                        <SelectItem value={option.value} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

export {SortSelect}