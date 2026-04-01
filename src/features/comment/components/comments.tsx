"use client"
import {CommentItem} from "@/features/comment/actions/comment-item";
import {CardCompact} from "@/components/card-compact";
import {CreateCommentForm} from "@/features/comment/components/create-comment-form";
import {DeleteCommentButton} from "@/features/comment/components/delete-comment-button";
import {CommentWithMetadata} from "@/features/comment/types";
import {Button} from "@/components/ui/button";
import {getComments} from "@/features/comment/queries/get-comments";
import {useState} from "react";

type CommentProps = {
    ticketId: string
    paginatedComments: {
        list: CommentWithMetadata[]
        metadata: { count: number, hasNextPage: boolean }
    }
}
export const Comments = ({ticketId, paginatedComments}: CommentProps) => {
    const [comments, setComments] = useState(paginatedComments.list);
    const handleMore = async () => {
        const morePaginatedComments = await getComments(ticketId)
        const moreComments = morePaginatedComments.list
        setComments([...comments, ...moreComments])
    }
    return (
        <>
            <CardCompact title="Create Comment"
                         content={<CreateCommentForm ticketId={ticketId}/>}
                         description="A new comment will be created"
            />
            <div className="flex flex-col gap-x-2 ml-8">
                {comments.map(comment => (
                    <CommentItem key={comment.id}
                                 comment={comment}
                                 buttons={[
                                     ...(comment.isOwner
                                         ? [<DeleteCommentButton key="0" id={comment.id}/>]
                                         : [])
                                 ]}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-y-2 ml-8">
                <Button onClick={handleMore} variant="ghost">More</Button>
            </div>
        </>
    )
}