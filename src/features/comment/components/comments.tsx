import {CommentItem} from "@/features/comment/actions/comment-item";
import {CardCompact} from "@/components/card-compact";
import {CreateCommentForm} from "@/features/comment/components/create-comment-form";
import {DeleteCommentButton} from "@/features/comment/components/delete-comment-button";
import {CommentWithMetadata} from "@/features/comment/types";

type CommentProps = {
    ticketId: string
    comments?: CommentWithMetadata[]
}
export const Comments =  ({ticketId, comments = []}: CommentProps) => {

    return (
        <>
            <CardCompact title="Create Comment"
                         content={<CreateCommentForm ticketId={ticketId}/>}
                         description="A new comment will be created"
            />
            <div className="flex flex-col gap-x-2 ml-8">
                {
                    comments.map(comment => (
                        <CommentItem key={comment.id}
                                     comment={comment}
                                     buttons={[
                                         ...(comment.isOwner
                                             ? [<DeleteCommentButton key="0" id={comment.id}/>]
                                             : [])
                                     ]}
                        />
                    ))
                }
            </div>
        </>
    )
}