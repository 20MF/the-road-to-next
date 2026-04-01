"use client"

import {createComment} from "@/features/comment/actions/create-comment";
import {ActionState, EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {Form} from "@/components/form/form";
import {Textarea} from "@/components/ui/textarea";
import {FieldError} from "@/components/form/field-error";
import {SubmitButton} from "@/components/form/submit-button";
import {useActionState} from "react";
import {CommentWithMetadata} from "@/features/comment/types";

type CreateCommentFormProps = {
    ticketId: string
    onCreateComment: (comment: CommentWithMetadata | undefined) => void
}

const CreateCommentForm = ({ticketId, onCreateComment}: CreateCommentFormProps) => {
    const [actionState, action] = useActionState(
        createComment.bind(null, ticketId),
        EMPTY_ACTION_STATE
    )

    const handleSuccess = (actionState: ActionState) => {
        onCreateComment?.(actionState.data as CommentWithMetadata)
    }

    return (
        <Form action={action}
              actionState={actionState}
              onSuccess={handleSuccess}>
            <Textarea name="content" placeholder="What's on your mind...."/>
            <FieldError actionState={actionState} name="content"/>

            <SubmitButton label="Comment"/>
        </Form>
    )
}

export {CreateCommentForm}