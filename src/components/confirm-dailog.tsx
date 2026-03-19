import {ActionState} from "@/components/form/utlis/to-action-state";
import {Button} from "@/components/ui/button";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

type  ConfirmDialogProps = {
    title?: string,
    description?: string,
    action: () => Promise<ActionState>,
    trigger: React.ReactElement
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const ConfirmDialog = ({
                           title = "Are you absolutely sure?",
                           description = "This action cannot be undone. Make sure you understand the consequences.",
                           action,
                           trigger,
                       }: ConfirmDialogProps) => {

return (
    <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {/*<AlertDialogAction asChild>*/}
                    <form action={action}>
                        <Button type="submit">Confirm</Button>
                    </form>
                {/*</AlertDialogAction>*/}
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)
}
export {ConfirmDialog}