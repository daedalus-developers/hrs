"use client";

import { useFormState } from "react-dom";
import { resendVerificationCode, verifyAccount } from "@actions/verify";

const initialState = { status: 0, message: "" };

export default function VerificationForm({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const [state, formAction] = useFormState(verifyAccount, initialState);

  console.log(state.message);
  return (
    <div className="space-y-4">
      <p>Please verify your account</p>
      <form action={formAction} className="text-black">
        <input name="code" type="text" />
        <input name="userId" value={userId} hidden readOnly />
        <button type="submit" className="bg-white">
          Submit
        </button>
      </form>
      <form action={resendVerificationCode}>
        <input name="email" value={email} hidden readOnly />
        <input name="userId" value={userId} hidden readOnly />
        <button type="submit" className="bg-white text-black">
          Resend Verification Code
        </button>
      </form>
    </div>
  );
}
