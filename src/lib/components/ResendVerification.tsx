'use client'

import { resendCode } from "@actions";
import { useFormState } from "react-dom";

const initialState = { status: 0, message: "" };

export default function ResendVerification({ userId, email }: { userId: string, email: string }) {
  const [state, formAction] = useFormState(resendCode, initialState);

  return (
    <div>
      <form action={formAction}>
        <input name="email" value={email} hidden readOnly />
        <input name="userId" value={userId} hidden readOnly />
        <button type="submit" className="bg-white text-black">
          Resend Verification Code
        </button>
      </form>
    </div>
  )
}

