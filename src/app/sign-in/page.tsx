import {CardCompact} from "@/components/card-compact";
import Link from "next/link";
import {passwordForgotPath, signUpPath} from "@/paths";
import {SignInForm} from "@/features/auth/components/sign-in-form";

const SignInPage = () => {
    return (
        <div className="flex flex-1 flex-col justify-between items-center">
            <CardCompact title="Sign In"
                         content={<SignInForm/>}
                         description="Sign in to your account"
                         footer={
                             <>
                                 <Link className="text-sm text-muted-forground" href={signUpPath()}>
                                     No account yet?.
                                 </Link>

                                 <Link className="text-sm text-muted-forground" href={passwordForgotPath()}>
                                     Forgot Password.
                                 </Link>
                             </>
                         }
            />
        </div>
    )
}

export default SignInPage