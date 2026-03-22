"use client"
import {Form} from "@/components/form/form";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/form/submit-button";
import {useActionState} from "react";
import {EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {signUp} from "@/features/auth/actions/sign-up";
import {FieldError} from "@/components/form/field-error";

//完善字段验证功能
const SignUpForm = () => {
    const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE)
    return (
        <Form action={action} actionState={actionState}>
            <Input name="username"
                   placeholder="Username"
                   defaultValue={actionState.payload?.get("username") as string}/>
            <FieldError actionState={actionState} name="username"/>

            <Input name="email"
                   placeholder="Email"
                   defaultValue={actionState.payload?.get("email") as string}/>
            <FieldError actionState={actionState} name="email" />

            <Input name="password"
                   placeholder="Password"
                   defaultValue={actionState.payload?.get("password") as string}/>
            <FieldError actionState={actionState} name="password" />

            <Input name="confirmPassword"
                   placeholder="confirmPassword"
                   type="password"
                   defaultValue={actionState.payload?.get("confirmPassword") as string}/>
            <FieldError actionState={actionState} name="confirmPassword"/>

            <SubmitButton label="Sign Up"/>
        </Form>
    )
}
export {SignUpForm}