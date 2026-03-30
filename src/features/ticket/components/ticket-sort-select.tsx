"use client"
import {useQueryStates} from "nuqs";
import {sortOption, sortParser} from "@/features/ticket/search-params";
import {SortSelect} from "@/components/sort-select";

type Option = {
    label: string
    sortKey: string
    sortValue: string
}

export type TicketSortSelectProps = {
    options: Option[]
}

/**
 *   useQueryStates 通过将多个状态更新合并为一次，实现了更高效的渲染
 * 管理多个参数时：优先使用 useQueryStates，以获得更好的性能。
 * 仅管理单个参数时：使用 useQueryState 更加简洁方便
 */
const TicketSortSelect = ({options}: TicketSortSelectProps) => {


    const [sort, setSort] = useQueryStates(sortParser, sortOption)

    return <SortSelect options={options} value={sort} onChange={setSort}/>

}
export {TicketSortSelect}