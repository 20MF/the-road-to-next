import {CommentItem} from "@/features/comment/actions/comment-item";
import {getComments} from "@/features/comment/queries/get-comments";

type CommentProps = {
    ticketId:string
}
export const Comments = async ({ticketId}:CommentProps) => {
    const comments=await getComments(ticketId)

    return (
        <div className="flex flex-col gap-x-2 ml-8">
            {
                comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment}/>
                ))
            }
        </div>

    )
}