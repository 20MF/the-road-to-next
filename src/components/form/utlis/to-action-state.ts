import {ZodError, z} from "zod";

export type ActionState = {
    status?: "SUCCESS" | "ERROR",
    message: string,
    payload?: FormData,
    fieldErrors: Record<string, string[] | undefined>
    timestamp: number
}

export const EMPTY_ACTION_STATE: ActionState = {
    message: '',
    fieldErrors: {},
    timestamp: Date.now()
}

//处理返回值,两条路径
//此处是处理失败
export const FromErrorToAction = (error: unknown,
                           formData: FormData,
): ActionState => {
    if (error instanceof ZodError) {
        return {
            status: "ERROR",
            message: "",
            fieldErrors: z.flattenError(error).fieldErrors,
            payload: formData,
            timestamp: Date.now()
        }
    } else if (error instanceof Error) {
        return {
            status: "ERROR",
            message: error.message,
            fieldErrors: {},
            payload: formData,
            timestamp: Date.now()
        }
    } else {
        return {
            status: "ERROR",
            message: "An Unknown error occured",
            fieldErrors: {},
            payload: formData,
            timestamp: Date.now()
        }
    }
}

//此处是处理成功
export const toActionState = (
    status: ActionState["status"],
    message: string
): ActionState => {
    return {
        status,
        message,
        fieldErrors: {},
        timestamp: Date.now()
    }
}
