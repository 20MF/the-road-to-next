"use client"
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useQueryState} from "nuqs";
import {sortParser} from "@/features/ticket/search-params";

type Option = {
    label: string
    value: string
}

type SortSelectProps = {
    options: Option[]
}

const SortSelect = ({options}: SortSelectProps) => {
    const [sort, setSort] = useQueryState("sort", sortParser)

    const handleSort = (value: string) => {
        setSort(value)
    }
    return (
        <Select
            onValueChange={handleSort}
            defaultValue={sort}
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