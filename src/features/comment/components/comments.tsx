import {CommentItem} from "@/features/comment/actions/comment-item";
import {getComments} from "@/features/comment/queries/get-comments";
import {CardCompact} from "@/components/card-compact";
import {CreateCommentForm} from "@/features/comment/components/create-comment-form";

type CommentProps = {
    ticketId: string
}
export const Comments = async ({ticketId}: CommentProps) => {
    const comments = await getComments(ticketId)

    return (
        <>
            <CardCompact title="Create Comment"
                         content={<CreateCommentForm ticketId={ticketId}/>}
                         description="A new comment will be created"
            />
            <div className="flex flex-col gap-x-2 ml-8">
                {
                    comments.map(comment => (
                        <CommentItem key={comment.id} comment={comment}/>
                    ))
                }
            </div>
        </>
    )
}