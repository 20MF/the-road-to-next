"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {NavItem} from "@/app/_navigation/sidebar/types";
import {closedClassName} from "@/app/_navigation/sidebar/constants";
import {cloneElement} from "react";
import {Separator} from "@/components/ui/separator";

type SidebarItemProps = {
    isOpen: boolean,
    navItem: NavItem
    isActive: boolean
}

const SidebarItem = ({isOpen, navItem, isActive}: SidebarItemProps) => {
    return (
        <>
            {navItem.separator && <Separator/>}
            <Link href={navItem.href}
                  className={cn(
                      buttonVariants({variant: "ghost"}),
                      "group relative flex h-12 justify-start",
                      isActive && "bg-muted font-bold hover:bg-muted"
                  )}
            >
                {cloneElement(navItem.icon, {
                    className: "h-5 w-5",
                })}

                {/**/}
                <span
                    className={cn(
                        "absolute left-12 text-base duration-200",
                        isOpen ? "md:block hidden" : "w-[78px]",
                        !isOpen && closedClassName
                    )}
                >
        {navItem.title}
      </span>
            </Link>
        </>
    )
}

export {SidebarItem}