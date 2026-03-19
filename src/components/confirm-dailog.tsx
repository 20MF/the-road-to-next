import {ActionState} from "@/components/form/utlis/to-action-state";
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
} from "radix-ui";
import * as React from "react";

type  ConfirmDialogProps = {
    title?: string,
    description?: string,
    action: () => Promise<ActionState>,
    trigger: React.ReactElement
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
// const ConfirmDialog = ({
//                            title = "Are you absolutely sure?",
//                            description = "This action cannot be undone. Make sure you understand the consequences.",
//                            action,
//                            trigger,
//                        }: ConfirmDialogProps) => {

const ConfirmDialog = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger>Open</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay />
                <AlertDialog.Content >
                    <AlertDialog.Title>test</AlertDialog.Title>
                    <AlertDialog.Description>hello test</AlertDialog.Description>
                    <form
                        onSubmit={(event) => {
                            wait().then(() => setOpen(false));
                            event.preventDefault();
                            console.log("test")
                        }}
                    >
                        {/** some inputs */}
                        <button type="submit">Submit</button>
                    </form>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export {ConfirmDialog}