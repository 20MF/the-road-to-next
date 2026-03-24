"use client"
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {getAuth} from "@/features/auth/queries/get-auth";
import {User} from "lucia";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isFetch, setIsFetch] = useState(false);

    const pathName = usePathname()

    useEffect(() => {
        const fetchUser = async () => {
            const {user} = await getAuth()
            setUser(user)
            setIsFetch(true)
        }

        fetchUser()
    }, [pathName]);

    return {user, isFetch}
}

export {useAuth}