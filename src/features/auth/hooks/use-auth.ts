import {useEffect, useState} from "react";
import {User as AuthUser} from "lucia/dist/core";
import {usePathname} from "next/navigation";
import {getAuth} from "@/features/auth/queries/get-auth";

const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isFetch, setIsFetch] = useState(false);

    const pathName = usePathname()



    useEffect(() => {
        const fetchUser = async () => {
            const {user} = await getAuth()
            setUser(user)
        }

        setIsFetch(true)
        fetchUser()
    }, [pathName]);

    return {user, isFetch}
}

export {useAuth}