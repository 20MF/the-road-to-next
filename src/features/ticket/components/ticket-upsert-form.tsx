"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Ticket} from "@/generated/prisma/client";
import {UpsertTicket} from "@/features/ticket/actions/upsert-ticket";
import {useActionState} from "react";
import {SubmitButton} from "@/components/form/submit-button";
import {FieldError} from "@/components/form/field-error";
import {EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {useActionFeedback} from "@/components/form/hooks/use-action-feedback";

type TicketUpdateFormProps = {
    ticket?: Ticket
}

const TicketUpsertForm = ({ticket}: TicketUpdateFormProps) => {
    const [actionState, action] = useActionState(
        UpsertTicket.bind(null, ticket?.id as string),
        EMPTY_ACTION_STATE
    )

    useActionFeedback(actionState,{
        onSuccess: ({actionState}) =>{
            console.log(actionState.message)
        },
        onError: ({actionState}) => {
            console.log(actionState.message)
        }
    })
    return (
        <form action={action} className="flex flex-col gap-y-2">

            <Label htmlFor={"title"}>Title</Label>
            <Input id="title" name="title" type="text"
                   defaultValue={(actionState.payload?.get("title") as string) ?? ticket?.title}/>

            <FieldError actionState={actionState} name="title"/>

            <Label htmlFor={"content"}>Content</Label>
            <Textarea id="content" name="content"
                      defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content}/>
            <FieldError actionState={actionState} name="content"/>

            <SubmitButton label={ticket ? "Edit" : "Create"}/>

            {actionState.message}
        </form>

    )
}

export {TicketUpsertForm}