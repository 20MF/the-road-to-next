"use server"

import {z} from "zod";
import {ActionState, FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {redirect} from "next/navigation";
import {ticketsPath} from "@/paths";
import {prisma} from "@/lib/prisma";
import {verify} from "@node-rs/argon2";
import {lucia} from "@/lib/lucia";
import {cookies} from "next/headers";

const signInSchema = z
    .object({
        email: z.templateLiteral([z.string().min(1), "@", z.string().max(191)]),
        password: z.string().min(6).max(191),
    })
const SignIn = async (_actionState: ActionState, formData: FormData) => {
    try {
        const {email, password} = signInSchema.parse(
            Object.fromEntries(formData)
            // {
            //     email: formData.get("email"),
            //         password: formData.get("password"),
            // }
        )

        const user = await prisma.user.findUnique({
            where: {
                email
            },
        })

        if (!user) {
            return toActionState("ERROR", "User not found", formData)
        }

        const vaildPassword = await verify(user.passwordHash, password)

        if (!vaildPassword) {
            return toActionState("ERROR", "Invalid password", formData)
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

    } catch (error) {
        return FromErrorToAction(error,formData)
    }
    redirect(ticketsPath())
}

export {SignIn}