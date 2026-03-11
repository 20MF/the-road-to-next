import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Ticket} from "@/generated/prisma/client";
import {UpsertTicket} from "@/features/ticket/actions/upsert-ticket";

type TicketUpdateFormProps = {
    ticket?: Ticket
}
const TicketUpsertForm = ({ticket}: TicketUpdateFormProps) => {
    return (
        // bind绑定额外的数据到服务器上,此处id作为第一个参数传入
        <form action={UpsertTicket.bind(null, ticket?.id)} className="flex flex-col gap-y-2">
            {/*<Input type="hidden" name="id" defaultValue={ticket.id}/>*/}

            <Label htmlFor={"title"}>Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket?.title}/>

            <Label htmlFor={"content"}>Content</Label>
            <Textarea id="content" name="content" defaultValue={ticket?.content}/>

             {/*通过是否传入ticket参数来判断用edit还是create*/}
            <Button type="submit">{ticket? "Edit":"Create"}</Button>
        </form>

    )
}

export {TicketUpsertForm}