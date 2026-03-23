"use server"

import {ActionState, FromErrorToAction, toActionState} from "@/components/form/utlis/to-action-state";
import {hash} from "@node-rs/argon2";
import {z} from "zod";
import {prisma} from "@/lib/prisma";
import {lucia} from "@/lib/lucia";
import {cookies} from "next/headers";
import {Prisma} from "../../../../generated/prisma/client";
import {redirect} from "next/navigation";
import {signInPath, ticketsPath} from "@/paths";


const signUpSchema = z
    .object({
        username: z.string().min(1).max(191)
            .refine(value => !value.includes(" "), "Username cannot contain spaces"),
        email: z.templateLiteral([z.string().min(1), "@", z.string().max(191)]),
        password: z.string().min(6).max(191),
        confirmPassword: z.string().min(6).max(191)
    })
    .superRefine(({password, confirmPassword}) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Password do not match",
                path: ["confirmPassword"]
            })
        }
    })

const signUp = async (_actionState: ActionState, formData: FormData) => {
    try {
        const {username, email, password} = signUpSchema.parse(
            Object.fromEntries(formData)
        )
        //     {
        //         username: formData.get("username"),
        //     email: formData.get("email"),
        //     password: formData.get("password"),
        //     confirmPassword: formData.get("confirmPassword"),
        // })

        const passwordHash = await hash(password)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash
            }
        })

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        //不能通过函数引用,建立会话
        // createAuthSession(user.id)


    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return toActionState(
                "ERROR",
                "Either email or username is already in use",
                formData
            );
        }
        return FromErrorToAction(error, formData)
    }
    redirect(ticketsPath())
}

export {signUp}