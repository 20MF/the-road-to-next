"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type SortObject = {
    sortKey: string
    sortValue: string
}

type Option = {
    label: string
    sortKey: string
    sortValue: string
}

type SortSelectProps = {
    options: Option[]
    value: SortObject
    onChange: (sort: SortObject) => void
}

const SortSelect = ({options, value, onChange}: SortSelectProps) => {

    const handleSort = (compositeKey: string) => {
        const [sortKey, sortValue] = compositeKey.split("_")

        onChange({
            sortKey,
            sortValue
        })
    }
    return (
        <Select
            onValueChange={handleSort}
            defaultValue={value.sortKey + "_" + value.sortValue}
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