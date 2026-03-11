import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Ticket} from "@/generated/prisma/client";
import {UpdateTicket} from "@/features/ticket/actions/update-ticket";

type TicketUpdateFormProps ={
    ticket:Ticket
}
const TicketUpdateForm = ({ticket}:TicketUpdateFormProps) => {
    return (
        // 此处id作为第一个参数传入
        <form action={UpdateTicket.bind(null, ticket.id)} className="flex flex-col gap-y-2">
            {/*<Input type="hidden" name="id" defaultValue={ticket.id}/>*/}

            <Label htmlFor={"title"}>Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket.title}/>

            <Label htmlFor={"content"}>Content</Label>
            <Textarea id="content" name="content" defaultValue={ticket.content}/>

            <Button type="submit">Update</Button>
        </form>

    )
}

export {TicketUpdateForm}