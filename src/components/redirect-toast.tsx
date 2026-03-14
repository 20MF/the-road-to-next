"use client"

import {useEffect} from "react";
import {deleteCookieByKey, getCookieByKey} from "@/actions/cookies";
import {toast} from "sonner";
import {usePathname} from "next/navigation";

export const RedirectToast = () => {
    const pathname = usePathname();
    useEffect(() => {
        showCookieToast()
    }, [pathname]);

    const showCookieToast = async () => {
        const message = await getCookieByKey("toast")

        if (message) {
            toast.success(message)
            deleteCookieByKey("toast")
        }
    }
    return null
}

