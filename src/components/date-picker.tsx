"use client"

import * as React from "react"
import {LucideCalendar} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {format} from "date-fns";
import {Input} from "@/components/ui/input";

type DatePickerProps = {
    id: string
    name: string
    defaultValue: string | undefined
}

export const DatePicker = ({id, name, defaultValue}: DatePickerProps) => {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date())

    const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

    const handleSelect = (selectDate: Date|undefined) => {
        setDate(selectDate)
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="w-full" id={id} asChild>
                    <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                    >
                        <LucideCalendar className="mr-2 h-4 w-4"/>
                        {formattedStringDate}
                        <Input type="hidden" name={name} value={formattedStringDate}/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full  p-8" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        className="w-full rounded-md shadow-sm"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

