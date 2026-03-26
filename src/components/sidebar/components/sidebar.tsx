"use client"
import {useState} from "react";
import {cn} from "@/lib/utils";
import {navItems} from "@/components/sidebar/constants";
import {SidebarItem} from "@/components/sidebar/components/sidebar-item";
import {useAuth} from "@/features/auth/hooks/use-auth";

const Sidebar = () => {
    const [isTransition, setIsTransition] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {user,isFetch} =useAuth()

    const handleToggle = (open: boolean) => {
        setIsTransition(true)
        setIsOpen(true)
        setTimeout(() => setIsTransition(false), 200)
    }

    if (!user ||!isFetch){
        return <div className="w-[78px] bg-secondary/20"/>
    }

    return (
        <nav className={cn(
            "animate-sidebar-from-left",
            "h-screen boarder-r pt-24",
            isTransition && "duration-200",
            isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
        )}
             onMouseEnter={() => handleToggle(true)}
             onMouseLeave={() => handleToggle(false)}
        >
            <div className="px-3 py-2">
                <nav className="space-y--2">
                    {navItems.map(navItem => (
                        <SidebarItem isOpen={isOpen} navItem={navItem} key={navItem.title}/>
                    ))}
                </nav>
            </div>
        </nav>
    )
}

export {Sidebar}