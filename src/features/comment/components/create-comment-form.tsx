"use client"

import {createComment} from "@/features/comment/actions/create-comment";
import {EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {Form} from "@/components/form/form";
import {Textarea} from "@/components/ui/textarea";
import {FieldError} from "@/components/form/field-error";
import {SubmitButton} from "@/components/form/submit-button";
import { useActionState } from "react";
type CreateCommentFormProps = {
    ticketId: string
}

 const CreateCommentForm = ({ticketId}: CreateCommentFormProps) => {
    const [actionState, action] = useActionState(
        createComment.bind(null, ticketId),
        EMPTY_ACTION_STATE
    )

    return (
        <Form action={action} actionState={actionState}>
            <Textarea name="content" placeholder="What's on your mind...."/>
            <FieldError actionState={actionState} name="content"/>

            <SubmitButton label="Comment"/>
        </Form>
    )
}

export {CreateCommentForm}