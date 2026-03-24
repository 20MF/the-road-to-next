import {getAuth} from "@/features/auth/queries/get-auth";
import {redirect} from "next/navigation";
import {signInPath} from "@/paths";

const getAuthOrRedirect = async () => {
    const auth = await getAuth()

    if (!auth) {
        redirect(signInPath())
    }

    return auth
}

export {getAuthOrRedirect}