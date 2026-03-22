"use server"

import {lucia} from "@/lib/lucia";
import {getAuth} from "@/features/auth/queries/get-auth";
import {redirect} from "next/navigation";
import {signInPath} from "@/paths";
import {cookies} from "next/headers";

const SignOut = async () => {
    const {session} = await getAuth()

    if (!session) {
        redirect(signInPath())
    }

    //注销会话
    await lucia.invalidateSession(session.id)

    //创建一个空白会话
    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    redirect(signInPath())
}

export {SignOut}