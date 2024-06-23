"use client";
import { useFormState } from "react-dom";
import { login } from "@actions/login";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";

const initialState = { status: 0, message: "" };

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);
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
          value={"Login"}
        />
        <span>
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </span>
        <p className="text-red-500">{state.message || ""}</p>
      </form>
    </div>
  );
}
