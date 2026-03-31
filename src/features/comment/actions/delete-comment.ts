"use server"
import {getAuthOrRedirect} from "@/features/auth/queries/get-auth-or-redirect";
import {prisma} from "../../../../prisma/lib/prisma";
import {isOwner} from "@/features/auth/utils/is-owner";
import {FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {revalidatePath} from "next/cache";
import {ticketPath} from "@/paths";

const deleteComment = async (id: string) => {
    const {user} = await getAuthOrRedirect()

    const comment = await prisma.comment.findUnique({
        where: {
            id
        }
    })

    if (!comment || !isOwner(user, comment)) {
        return toActionState("ERROR", "not authorized")
    }

    try {
        await prisma.comment.delete({
            where: {id}
        })
    } catch (error) {
        return FromErrorToAction(error)
    }

    revalidatePath(ticketPath(comment.ticketId))
    return toActionState("SUCCESS", "delete success.")
}

export {deleteComment}