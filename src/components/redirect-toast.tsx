"use client"

import {useEffect} from "react";
import {deleteCookieByKey, getCookieByKey} from "@/actions/cookies";
import {toast} from "sonner";
import {usePathname} from "next/navigation";

export const RedirectToast = () => {
    const pathname = usePathname();
    useEffect(() => {
        const showCookieToast = async () => {
            const message = await getCookieByKey("toast")

            // console.log(message)
            if (message) {
                toast.success(message)
                deleteCookieByKey("toast")
            }
        }
        showCookieToast()
    }, [pathname]);

    return null
}

