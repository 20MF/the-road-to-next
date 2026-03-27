import Link from "next/link";
import {ticketsPath} from "@/paths";
import Heading from "@/components/heading";
import {Suspense} from "react";
import {Spinner} from "@/app/(authenticated)/tickets/[ticketId]/spinner";
import {TicketList} from "@/features/ticket/components/ticket-list";
import {SearchParams} from "@/features/ticket/search-params";

type HomeProps = {
    searchParams: Promise<SearchParams>
}

const HomePage = async ({searchParams}: HomeProps) => (
    <div className="flex flex-1 flex-col gap-y-8">
        <Heading title="All Tickets"
                 description="Tickets by everyone at one place"/>

        {/*//显示所有票据*/}
        <Suspense fallback={<Spinner/>}>
            <TicketList searchParams={await searchParams}/>
        </Suspense>


    </div>
)
export default HomePage