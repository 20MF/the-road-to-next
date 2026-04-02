"use client"
import {useConfirmDialog} from "@/components/confirm-dailog";
import {Button} from "@/components/ui/button";
import {LucideLoaderCircle, LucideTrash} from "lucide-react";
import {deleteComment} from "@/features/comment/actions/delete-comment";

type DeleteCommentButtonProps = {
    id: string
    onDeleteComment?: (id: string) => void
}
const DeleteCommentButton = ({id, onDeleteComment}: DeleteCommentButtonProps) => {
    const [deleteButton, deleteDialog] = useConfirmDialog({
        action: deleteComment.bind(null, id),
        trigger: (isPending) => (
            <Button variant="outline" size="icon">
                {isPending
                    ? <LucideLoaderCircle className="h-4 w-4 animate-spin"/>
                    : <LucideTrash className="h-4 w-4"/>
                }
            </Button>
        ),
        //onSuccess是个回调函数,当成功后,执行onDeleteComment事件
        onSuccess: () => onDeleteComment?.(id)
    })

    return (
        <>
            {deleteDialog}
            {deleteButton}
        </>
    )
}

export {DeleteCommentButton}