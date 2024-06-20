"use client";

import { signup } from "@actions/signup";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
const initialState = { status: 0, message: "" };

export default function SignUp() {
    const [state, formAction] = useFormState(signup, initialState);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
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
                    type="email"
                    description="Enter your Email Address"
                    isClearable={true}
                />

                <Input
                    className="max-w-sm"
                    label="Password"
                    labelPlacement="inside"
                    isRequired
                    name="password"
                    type={isVisible ? "text" : "password"}
                    description="Enter your Password"
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
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
