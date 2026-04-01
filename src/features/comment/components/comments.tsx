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
    const [metadata, setMetadata] = useState(paginatedComments.metadata);

    const handleMore = async () => {
        const morePaginatedComments = await getComments(ticketId, comments.length)

        const moreComments = morePaginatedComments.list

        setComments([...comments, ...moreComments])
    }

    //过滤掉已删除id记录
    const handleDeleteComment = (id: string) => {
        setComments(prevComment =>
            prevComment.filter(comment => comment.id != id))
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
                                         ? [<DeleteCommentButton
                                             key="0"
                                             id={comment.id}
                                             onDeleteComment={handleDeleteComment}
                                         />]
                                         : [])
                                 ]}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-y-2 ml-8">
                {metadata.hasNextPage && (
                        <Button onClick={handleMore} variant="ghost">
                        More
                    </Button>)}
            </div>
        </>
    )
}