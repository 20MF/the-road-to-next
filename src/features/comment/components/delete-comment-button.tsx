"use client"
import {useConfirmDialog} from "@/components/confirm-dailog";
import {Button} from "@/components/ui/button";
import {LucideTrash} from "lucide-react";
import {deleteComment} from "@/features/comment/actions/delete-comment";

type DeleteCommentButtonProps = {
    id: string
}
const DeleteCommentButton = ({id}: DeleteCommentButtonProps) => {
    const [deleteButton, deleteDialog] = useConfirmDialog({
        action: deleteComment.bind(null, id),
        trigger: (
            <Button variant="outline" size="icon">
                <LucideTrash className="h-4 w-4"/>
            </Button>
        )
    })

    return (
        <>
            {deleteDialog}
            {deleteButton}
        </>
    )
}

export {DeleteCommentButton}