import {ActionState} from "@/components/form/utlis/to-action-state";

type FieldErrorProps = {
    actionState: ActionState,
    name: string
}
const FieldError = ({actionState, name}: FieldErrorProps) => {
    //如果时字段格式错误,转化成message消息,传递到页面
    const message = actionState.fieldErrors[name]?.[0]
    return (
        <span className="text-xs text-red-500">
            {message}
        </span>
    )
}

export {FieldError}