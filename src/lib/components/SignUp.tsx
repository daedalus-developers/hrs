"use client";

import { signup } from "@actions/signup";
import { useFormState } from "react-dom";

const initialState = { status: 0, message: "" };

export default function SignUp() {
  const [state, formAction] = useFormState(signup, initialState);

  console.log(state.message);
  return (
    <div>
      <form action={formAction} className="text-black">
        <input name="lastName" type="text" placeholder="Last Name" />
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="email" type="text" placeholder="Email Address" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit" className="bg-white">
          Submit
        </button>
      </form>
    </div>
  );
}
