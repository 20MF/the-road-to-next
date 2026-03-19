import {Ticket, TicketStatus} from "@/generated/prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LucideTrash} from "lucide-react";
import {TICKET_ICONS_LABELS} from "@/features/constants";
import {updateTicketStatus} from "@/features/ticket/actions/update-ticket-status";
import {toast} from "sonner";

type TicketMoreMenuProps = {
    ticket: Ticket,
    trigger: React.ReactElement
}
export const TicketMoreMenu = ({ticket, trigger}: TicketMoreMenuProps) => {
    const deleteButton = (
        <DropdownMenuItem>
            <LucideTrash className="mr-2 w-4 h-4"/>
            <span>Delete</span>
        </DropdownMenuItem>
    )

    const handleUpateTicketStatus = async (value: string) => {
        //等候期
        const promise = updateTicketStatus(ticket.id, value as TicketStatus)

        toast.promise(promise, {
            loading: "update status...."
        })

        //出现结果后,加载消息提示框消失
        const result = await promise

        if (result.status === 'ERROR') {
            toast.error(result.message)
        } else if (result.status === 'SUCCESS') {
            toast.success(result.message)
        }
    }

    const ticketStatusDropdownMenuRadioGroup = (
        <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleUpateTicketStatus}>
            {(Object.keys(TICKET_ICONS_LABELS) as Array<TicketStatus>).map(key => (
                <DropdownMenuRadioItem value={key} key={key}>
                    {TICKET_ICONS_LABELS[key]}
                </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
    )

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {trigger}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side="right">
                    {ticketStatusDropdownMenuRadioGroup}
                    <DropdownMenuSeparator/>
                    {deleteButton}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}