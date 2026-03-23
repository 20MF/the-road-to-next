"use client"

import Link from "next/link";
import {ticketsPath, homePath, signUpPath, signInPath} from "@/paths";
import {Button, buttonVariants} from "@/components/ui/button";
import {LucideLogOut, LucideKanban} from "lucide-react";
import {ThemeSwitch} from "@/theme/theme-switch";
import {SignOut} from "@/features/auth/actions/sign-out";
import {SubmitButton} from "@/components/form/submit-button";
import {getAuth} from "@/features/auth/queries/get-auth";
import {useEffect, useState} from "react";
import {User as AuthUser} from "lucia";

const Header = () => {
    const [user, setUser] = useState<AuthUser | null>(null);

    //技巧,通过use client,使用钩子,使页面保持静态,而不是在函数使用asyn await,调用get-auth
    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        const {user} = await getAuth()
        setUser(user)
    }

    const navItem = user ? (
        <>
            <Link href={ticketsPath()} className={buttonVariants({variant: "default"})}>
                Tickets
            </Link>
            <form action={SignOut}>
                <SubmitButton label="Sign Out" icon={<LucideLogOut/>}/>
            </form>
        </>
    ) : (
        <>
            <Link href={signUpPath()} className={buttonVariants({variant: "outline"})}>
                Sign Up
            </Link>

            <Link href={signInPath()} className={buttonVariants({variant: "default"})}>
                Sign In
            </Link>
        </>
    )
    return (
        <nav className="flexed left-0 right-0 top-0 z-20 w-full
                        supports-backdrop-blur:bg-blackground/95
                        backdrop-blur px-5
                        flex justify-between py-2.5 boarder-b">
            <div className="flex align-items gap-x-2">
                {/*两种使用按钮的方法,第一种,增加Button元素*/}
                <Button asChild variant="ghost">
                    <Link href={homePath()}>
                        <LucideKanban/>
                        <h1 className="ml-2 text-lg font-semibold">
                            TicketBounty
                        </h1>
                    </Link>
                </Button>
            </div>
            <div className="flex align-items gap-x-2">
                <ThemeSwitch/>
                {/*第二种方法, 在classname中使用buttonVariants函数,把Link元素变体成Button元素*/}
                {navItem}
            </div>
        </nav>
    )
}

export {Header}