"use client"
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
import {useConfirmDialog} from "@/components/confirm-dailog";
import {deleteTicket} from "@/features/ticket/actions/delete-ticket";

import {useState} from "react";
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type TicketMoreMenuProps = {
    ticket: Ticket,
    trigger: React.ReactElement
}
export const TicketMoreMenu = ({ticket, trigger}: TicketMoreMenuProps) => {
    const [deleteButton, deleteDialog] = useConfirmDialog(
        {
            action: deleteTicket.bind(null, ticket!.id),
            trigger: (
                <DropdownMenuItem>
                    <LucideTrash className="mr-2 w-4 h-4"/>
                    <span>Delete</span>
                </DropdownMenuItem>
            )
        }
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
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side="right">
                    <DropdownMenuItem>
                        {ticketStatusDropdownMenuRadioGroup}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem >
                       {deleteButton}
                    </DropdownMenuItem>



                </DropdownMenuContent>
            </DropdownMenu>
            {deleteDialog}
        </>
    )
}