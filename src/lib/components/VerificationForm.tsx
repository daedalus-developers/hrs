"use client";

import { verifyAccount } from "@actions";
import { useFormState } from "react-dom";

const initialState = { status: 0, message: "" };

export default function VerificationForm({
  userId,
}: {
  userId: string;
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
    </div>
  );
}
