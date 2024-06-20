"use client";

import { signup } from "@actions/signup";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/react";
const initialState = { status: 0, message: "" };

export default function SignUp() {
    const [state, formAction] = useFormState(signup, initialState);

    console.log(state.message);
    return (
        <div className="space-y-4 h-screen flex justify-center items-center">
            <form
                action={formAction}
                className="container flex flex-col justify-center items-center space-y-4 mx-auto"
            >
                <Input
                    className="max-w-sm"
                    label="First Name"
                    labelPlacement="inside"
                    isRequired
                    name="firstName"
                    type="text"
                    description="Enter your First Name"
                    isClearable={true}
                />
                <Input
                    className="max-w-sm"
                    label="Last Name"
                    labelPlacement="inside"
                    isRequired
                    name="lastName"
                    type="text"
                    description="Enter your Last Name"
                    isClearable={true}
                />
                <Input
                    className="max-w-sm"
                    label="Email Address"
                    labelPlacement="inside"
                    isRequired
                    name="email"
                    type="text"
                    description="Enter your Email Address"
                    isClearable={true}
                />
                <Input
                    className="max-w-sm"
                    label="Password"
                    labelPlacement="inside"
                    isRequired
                    name="password"
                    type="password"
                    description="Enter your Password"
                    isClearable={true}
                />
                <Input
                    role="button"
                    className="max-w-sm"
                    type="submit"
                    value={"Sign Up"}
                />
                <span>
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500">
                        Login
                    </a>
                </span>
                <p className="text-red-500">{state.message || ""}</p>
            </form>
        </div>
    );
}
