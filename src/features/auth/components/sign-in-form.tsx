"use client"
import {Input} from "@/components/ui/input";
import {FieldError} from "@/components/form/field-error";
import {SubmitButton} from "@/components/form/submit-button";
import {Form} from "@/components/form/form";
import {useActionState} from "react";
import {EMPTY_ACTION_STATE} from "@/components/form/utlis/to-action-state";
import {SignIn} from "@/features/auth/actions/sign-in";

const SignInForm = () => {
    const [actionState, action] = useActionState(SignIn, EMPTY_ACTION_STATE)

    return (
        <Form action={action} actionState={actionState}>

            <Input name="email"
                   placeholder="Email"
                   defaultValue={actionState.payload?.get("email") as string}/>
            <FieldError actionState={actionState} name="email"/>

            <Input name="password"
                   placeholder="Password"
                   defaultValue={actionState.payload?.get("password") as string}/>
            <FieldError actionState={actionState} name="password"/>

            <SubmitButton label="Sign In"/>
        </Form>
    )
}

export {SignInForm}