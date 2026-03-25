import Link from "next/link";
import {ticketsPath} from "@/paths";
import Heading from "@/components/heading";
import {Suspense} from "react";
import {Spinner} from "@/app/tickets/[ticketId]/spinner";
import {TicketList} from "@/features/ticket/components/ticket-list";


export default function Home() {
    return (
        <div className="flex flex-1 flex-col gap-y-8">
            <Heading title="All Tickets"
                     description="Tickets by everyone at one place"/>

            {/*//显示所有票据*/}
            <Suspense fallback={<Spinner/>}>
                <TicketList/>
            </Suspense>


        </div>
    );
}
