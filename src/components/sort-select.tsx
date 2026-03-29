"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useQueryState, useQueryStates} from "nuqs";
import {sortOption, sortParser} from "@/features/ticket/search-params";

type Option = {
    label: string
    sortKey: string
    sortValue: string
}

type SortSelectProps = {
    options: Option[]
}

const SortSelect = ({options}: SortSelectProps) => {

    /**
     * useQueryStates 通过将多个状态更新合并为一次，实现了更高效的渲染
     * 管理多个参数时：优先使用 useQueryStates，以获得更好的性能。
     * 仅管理单个参数时：使用 useQueryState 更加简洁方便
     */

    const [sort, setSort] = useQueryStates(sortParser, sortOption)

    const handleSort = (compositeKey: string) => {
        const [sortKey, sortValue] = compositeKey.split("_")

        setSort({
            sortKey,
            sortValue
        })
    }
    return (
        <Select
            onValueChange={handleSort}
            defaultValue={sort.sortKey + "_" + sort.sortValue}
        >
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                {
                    options.map(option => (
                        <SelectItem value={option.sortKey + "_" + option.sortValue}
                                    key={option.sortKey + option.sortValue}>
                            {option.label}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

export {SortSelect}