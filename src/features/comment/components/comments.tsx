import {CommentItem} from "@/features/comment/actions/comment-item";
import {getComments} from "@/features/comment/queries/get-comments";
import {CardCompact} from "@/components/card-compact";
import {CreateCommentForm} from "@/features/comment/components/create-comment-form";
import {getAuth} from "@/features/auth/queries/get-auth";
import {isOwner} from "@/features/auth/utils/is-owner";
import {DeleteCommentButton} from "@/features/comment/components/delete-comment-button";
import {CommentWithMetadata} from "@/features/comment/types";

type CommentProps = {
    ticketId: string
    comments:CommentWithMetadata[]
}
export const Comments = async ({ticketId,comments=[]}: CommentProps) => {
    const {user} = await getAuth()

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
                                         ...(isOwner(user, comment))
                                             ? [<DeleteCommentButton key="0" id={comment.id}/>]
                                             : []
                                     ]}
                        />
                    ))
                }
            </div>
        </>
    )
}