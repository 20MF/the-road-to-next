// "use client"

import {Separator} from "@/components/ui/separator";
import Heading from "@/components/heading";
import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";

// 只有在服务器端组件中才能通过异步操作直接获取数据,客户端组件不能如此操作
const TicketsPage =async () => {
    const tickets=await getTickets()
    // const [tickets, setTickets] = useState<Ticket[]>([]);
    //
    // const fetchTickets = async () => {
    //     const result = await getTickets()
    //     setTickets(result)
    // }
    // useEffect(() => {
    //     fetchTickets()
    // }, []);
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place"/>

            <Separator/>
            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
                {
                    tickets.map((ticket) => (
                        <TicketItem ticket={ticket} key={ticket.id} isDetail={false}/>
                    ))
                }
            </div>
        </div>
    )
}

export default TicketsPage