"use server"

import { resendSchema } from "@server/schemas";

export const resendCode = async (_: any, formData: FormData) => {
  const userId = formData.get("userId") as string;
  const email = formData.get("email") as string;

  const res = await fetch('http://localhost:3000/api/auth/resend', {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      resendSchema.parse({
        userId: userId,
        email: email
      }))
  })

  const data = await res.json()

  return { status: res.status, message: data.message }
};
