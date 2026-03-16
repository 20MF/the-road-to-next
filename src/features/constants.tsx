import {LucideFileCheck, LucideFileText, LucidePencil} from "lucide-react";

export type IconType = "OPEN" | "DONE" | "IN_PROGRESS"

export const TICKET_ICONS = {
    OPEN: <LucideFileText/>,
    DONE: <LucideFileCheck/>,
    IN_PROGRESS: <LucidePencil/>
}

export const TICKET_ICONS_LABELS = {
    OPEN: "Open",
    DONE: "Done",
    IN_PROGRESS: "In_progress"
}