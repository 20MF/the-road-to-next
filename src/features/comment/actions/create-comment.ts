"use server"
import {ActionState, FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {z} from "zod";
import {getAuthOrRedirect} from "@/features/auth/queries/get-auth-or-redirect";
import {prisma} from "../../../../prisma/lib/prisma";
import {revalidatePath} from "next/cache";
import {ticketPath} from "@/paths";

const createCommentSchema = z.object({
    content: z.string().min(1).max(1024)
})

const createComment = async (ticketId: string,
                             _actionState: ActionState,
                             formData: FormData) => {
    const {user} = await getAuthOrRedirect()

    let comment
    try {
        const data = createCommentSchema.parse(Object.fromEntries(formData))

        comment = await prisma.comment.create({
            data: {
                userId: user!.id,
                ticketId: ticketId,
                ...data
            }
        })
    } catch (error) {
        return FromErrorToAction(error)
    }
    revalidatePath(ticketPath(ticketId))
    return toActionState("SUCCESS",
        "Comment created.",
        undefined, {
        ...comment,
        isOwner: true
    })
}

export {createComment}