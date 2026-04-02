import {ActionState, EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {cloneElement, useActionState, useEffect, useRef, useState} from "react";
import {Form} from "@/components/form/form";
import {SubmitButton} from "@/components/form/submit-button";
import {Button} from "@/components/ui/button";
import {useActionFeedback} from "@/components/form/hooks/use-action-feedback";
import {toast} from "sonner";

type  useConfirmDialogProps = {
    title?: string,
    description?: string,
    action: () => Promise<ActionState>,
    trigger: React.ReactElement | ((isPending?: boolean) => React.ReactElement)
    onSuccess?: (actionState: ActionState) => void
}

/**
 * useActionState升级成关闭弹出框,通过toast提示执行过程
 *
 * 通过函数中useEffect监控执行情况,到达回调目的
 */
const useConfirmDialog = ({
                              title = "Are you absolutely sure?",
                              description = "This action cannot be undone. Make sure you understand the consequences.",
                              action,
                              trigger,
                              onSuccess
                          }: useConfirmDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const [actionState, formAction, isPending] = useActionState(action, EMPTY_ACTION_STATE)

    const toastRef = useRef<string | number | null>(null)

    const dialogTrigger = cloneElement(
        typeof trigger === "function" ? trigger(isPending) : trigger, {
            onClick: () => setIsOpen(state => !state)
        })

    useEffect(() => {
        if (isPending) {
            toastRef.current = toast.loading("Deleting ...")
        } else if (toastRef.current) {
            toast.dismiss(toastRef.current)
        }

        return () => {
            if (toastRef.current) {
                toast.dismiss(toastRef.current)
            }
        }
    }, [isPending]);

    useActionFeedback(actionState, {
        onSuccess: ({actionState}) => {
            if (actionState.message) {
                toast.success(actionState.message)
            }
            onSuccess?.(actionState)
        },
        onError: ({actionState}) => {
            if (!actionState.message) {
                toast.error(actionState.message)
            }
        }
    })

    // AlertDialogAction有个bug,不能用,待以后解决
    const dialog = (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/*<AlertDialogAction asChild>*/}
                    <form action={formAction}>
                        <Button type="submit">Confirm</Button>
                    </form>
                    {/*</AlertDialogAction>*/}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    return [dialogTrigger, dialog] as const
}
export {useConfirmDialog}