import {IconType} from "@/features/constants";

export interface Ticket {
    id: string,
    title: string
    content: string
    status: IconType
}