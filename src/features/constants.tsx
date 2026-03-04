import {LucideFileCheck, LucideFileText, LucidePencil} from "lucide-react";

export type IconType = "OPEN" | "DONE" | "IN_PROGRESS"

export const TICKET_ICONS = {
    OPEN: <LucideFileText/>,
    DONE: <LucideFileCheck/>,
    IN_PROGRESS: <LucidePencil/>
}