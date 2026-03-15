"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Ticket} from "@/generated/prisma/client";
import {UpsertTicket} from "@/features/ticket/actions/upsert-ticket";
import React, {useActionState, useRef} from "react";
import {SubmitButton} from "@/components/form/submit-button";
import {FieldError} from "@/components/form/field-error";
import {EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {useActionFeedback} from "@/components/form/hooks/use-action-feedback";
import {toast} from "sonner";
import {Form} from "@/components/form/form";
import {DatePicker, ImperativeHandleFromDataPicker} from "@/components/date-picker";
import {fromCent} from "@/utils/currency";


type TicketUpdateFormProps = {
    ticket?: Ticket
}

const TicketUpsertForm = ({ticket}: TicketUpdateFormProps) => {
    const [actionState, action] = useActionState(
        UpsertTicket.bind(null, ticket?.id as string),
        EMPTY_ACTION_STATE
    )

    const dataPickerImperativeHandleRef = useRef<ImperativeHandleFromDataPicker>(null)

    const handleSuccess = () => {
        dataPickerImperativeHandleRef.current?.reset()
    }

    return (
        <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
            <Label htmlFor="title">Title</Label>
            <Input
                id="title"
                name="title"
                type="text"
                defaultValue={(actionState.payload?.get("title") as string) ?? ticket?.title}
            />

            <FieldError actionState={actionState} name="title"/>

            <Label htmlFor="content">Content</Label>
            <Textarea
                id="content"
                name="content"
                defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content}
            />
            <FieldError actionState={actionState} name="content"/>

            <div className="flex gap-x-2 mb-1">
                <div className="w-1/2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <DatePicker
                        // key={actionState.timestamp}
                        id="deadline"
                        name="deadline"
                        defaultValue={
                            (actionState.payload?.get("dealine") as string) ?? ticket?.deadline
                        }

                        imperativeHandleRef={dataPickerImperativeHandleRef}
                    />
                </div>
                <FieldError actionState={actionState} name="deadline"/>

                <div className="w-1/2">
                    <Label htmlFor="bounty">bounty</Label>
                    <Input
                        id="bounty"
                        name="bounty"
                        type="number"
                        step=".01"
                        defaultValue={
                            (actionState.payload?.get("bounty") as string) ??
                            (ticket?.bounty ? fromCent(ticket?.bounty) : "")}
                    />
                    <FieldError actionState={actionState} name="bounty"/>
                </div>
            </div>
            <FieldError actionState={actionState} name="content"/>

            <SubmitButton label={ticket ? "Edit" : "Create"}/>
        </Form>

    )
}

export {TicketUpsertForm}