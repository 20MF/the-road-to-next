import {Card} from "@/components/ui/card";
import {CommentWithMetadata} from "@/features/comment/types";
import React from "react";
import {format} from "date-fns";

type CommentItemProps = {
    comment: CommentWithMetadata
    buttons: React.ReactNode[]
}

export const CommentItem = ({comment, buttons}: CommentItemProps) => {

    return (
        <div className="flex gap-x-2">
            <Card className="p-4 flex flex-1 flex-col gap-x-1">
                <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                        {comment.isOwner ? "You" : comment.user?.username ?? "Delete User"}
                    </p>
                    <p className="text-sm text-muted-foregroundt">
                        {format(comment.createdAt, "yyyy-mm-dd HH:mm")}
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