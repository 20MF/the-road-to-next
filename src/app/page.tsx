import Link from "next/link";
import {ticketsPath} from "@/paths";
import Heading from "@/components/heading";


export default function Home() {
    return (
        <div className="flex flex-1 flex-col gap-y-8">
            <Heading title="Home" description="Your home place to start"/>

            <div className="flex-1 flex flex-col items-center">
                <Link className="underline" href={ticketsPath()}>
                    Goto Tickets
                </Link>
            </div>
        </div>
    );
}
