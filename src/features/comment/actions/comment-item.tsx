import {Card} from "@/components/ui/card";
import {CommentWithMetadata} from "@/features/comment/types";
import React from "react";

type CommentItemProps = {
    comment: CommentWithMetadata
    buttons:React.ReactNode[]
}

export const CommentItem = ({comment,buttons}: CommentItemProps) => {

    return (
        <div className="flex gap-x-2">
            <Card className="p-4 flex flex-1 flex-col gap-x-1">
                <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                        {comment.user?.username ?? "Delete User"}
                    </p>
                    <p className="text-sm text-muted-foregroundt">
                        {comment.createdAt.toLocaleString()}
                    </p>
                    <p className="whitespace-pre-line">
                        {comment.content}
                    </p>
                </div>
            </Card>

            <div className="flex flex-col gap-x-1">{buttons}</div>
        </div>
    )
}