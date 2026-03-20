import {ActionState, EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {Button} from "@/components/ui/button";

import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {cloneElement, useActionState, useState} from "react";
import {Form} from "@/components/form/form";
import {SubmitButton} from "@/components/form/submit-button";

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

    const [actionState, formAction] = useActionState(action,EMPTY_ACTION_STATE)

    const handleSuccess = () => {
        setIsOpen(false)
    }

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
                        <Form action={formAction}
                              actionState={actionState}
                              onSuccess={handleSuccess}>
                            <SubmitButton label="Confirm" />
                        </Form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )

    return [dialogTrigger, dialog]
}
export {useConfirmDialog}