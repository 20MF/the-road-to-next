"use client"

import * as React from "react"
import {ChevronDownIcon, LucideCalendar} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Label} from "@/components/ui/label"
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

    // const [open, setOpen] = React.useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date())
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

    return (
        <div className="flex flex-col gap-3">
            <Popover>
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
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            // setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
