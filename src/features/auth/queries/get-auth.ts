"use server"
import {cookies} from "next/headers";
import {lucia} from "@/lib/lucia";

// 获取会话
const getAuth = async () => {
    const cookiesStore = await cookies()
    const sessionId = cookiesStore.get(lucia.sessionCookieName)?.value ?? null

    if (!sessionId) {
        return {
            user: null,
            session: null
        }
    }

    const result = await lucia.validateSession(sessionId)

    try {
        //会话存在,但时间过期,生成一个新的会话,不至于在app使用中断
        if (result.session?.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id)
            cookiesStore.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
        if (!result.session) {
            //无会话,会话过期,生成新的空白会话
            const sessionCookie = lucia.createBlankSessionCookie()
            cookiesStore.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
    } catch {

    }

    return result
}

export {getAuth}