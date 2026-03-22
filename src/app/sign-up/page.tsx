import {CardCompact} from "@/components/card-compact";
import Link from "next/link";
import {signInPath, signUpPath} from "@/paths";
import {SignUpForm} from "@/features/auth/components/sign-up-form";

const SignUpPage = () => {
    return (
       <div className="flex flex-1 flex-col justify-between items-center">
           <CardCompact title="Sign up"
                        content={<SignUpForm/>}
                        description="Create an account to get started"
                        footer={
                            <Link className="text-sm text-muted-forground" href={signInPath()} >
                                Have an account?Sign In now.
                            </Link>
                        }
           />
       </div>
    )
}

export default SignUpPage