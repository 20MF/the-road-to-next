import {ActionState} from "@/components/form/utlis/to-action-state";
import {Button} from "@/components/ui/button";

import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {cloneElement, useState} from "react";

type  useConfirmDialogProps = {
    title?: string,
    description?: string,
    action: () => Promise<ActionState>,
    trigger: React.ReactElement
}

const useConfirmDialog = ({
                              title = "Are you absolutely sure?",
                              description = "This action cannot be undone. Make sure you understand the consequences.",
                              action,
                              trigger,
                          }: useConfirmDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    //当触发器被抽出后,不能在原AlertDialog中使用AlertDialogTrigger
    const dialogTrigger = cloneElement(trigger, {
        onClick: () => setIsOpen(state => !state)
    })
    const dialog = (
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                {/*<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>*/}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={action}>
                            <Button type="submit">Confirm</Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )

    return [dialogTrigger, dialog]
}
export {useConfirmDialog}