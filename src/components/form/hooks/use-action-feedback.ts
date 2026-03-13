import {useEffect} from "react";
import {ActionState} from "@/components/form/utlis/to-action-state";

type OnArgs = {
    actionState: ActionState
}

type UseActionFeedbackOptions = {
    onSuccess?: (onArgs: OnArgs) => void
    onError?: (onArgs: OnArgs) => void
}

export const useActionFeedback = (
    actionState: ActionState,
    options: UseActionFeedbackOptions
) => {
    useEffect(() => {
        if (actionState.status == "SUCCESS") {
            options.onSuccess?.({actionState})
        }

        if (actionState.status == "ERROR") {
            options.onError?.({actionState})
        }
    }, [actionState, options]);
}
