import Link from "next/link";
import {ticketsPath, homePath} from "@/paths";
import {Button, buttonVariants} from "@/components/ui/button";
import {LucideKanban} from "lucide-react";

const Header = () => {
    return (
        <nav className="flexed left-0 right-0 top-0 z-20 w-full
                        bg-blackground/95 backdrop-blur px-5
                        flex justify-between py-2.5 boarder-b">
            <div>
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
            <div>
                {/*第二种方法, 在classname中使用buttonVariants函数,把Link元素变体成Button元素*/}
                <Link href={ticketsPath()} className={buttonVariants({variant: "default"})}>
                    Tickets
                </Link>
            </div>
        </nav>
    )
}

export {Header}