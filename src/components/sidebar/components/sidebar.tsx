"use client"
import {useState} from "react";
import {cn} from "@/lib/utils";
import {navItems} from "@/components/sidebar/constants";
import {SidebarItem} from "@/components/sidebar/components/sidebar-item";
import {useAuth} from "@/features/auth/hooks/use-auth";
import {usePathname} from "next/navigation";
import {getActivePath} from "@/utils/get-active-path";
import {signInPath, signUpPath} from "@/paths";

const Sidebar = () => {
    const [isTransition, setIsTransition] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {user, isFetch} = useAuth()
    const pathName = usePathname()

    const {activeIndex} = getActivePath(
        pathName,
        navItems.map((navItem) => navItem.href),
        [signInPath(), signUpPath()])

    const handleToggle = (open: boolean) => {
        setIsTransition(open)
        setIsOpen(open)
        setTimeout(() => setIsTransition(false), 200)
    }

    if (!user || !isFetch) {
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
                    {navItems.map((navItem, index) => (
                        <SidebarItem isOpen={isOpen}
                                     navItem={navItem}
                                     key={navItem.title}
                                     isActive={activeIndex === index}
                        />
                    ))}
                </nav>
            </div>
        </nav>
    )
}

export {Sidebar}