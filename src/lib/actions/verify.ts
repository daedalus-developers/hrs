"use server";

import { verifySchema } from "@server/schemas";
import { redirect } from "next/navigation";

export const verifyAccount = async (_: any, formData: FormData) => {
  const userId = formData.get("userId") as string;
  const code = formData.get("code") as string;

  const res = await fetch('http://localhost:3000/api/auth/verify', {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      verifySchema.parse({
        userId: userId,
        code: code
      }))
  })

  const data = await res.json()

  if (res.ok) redirect('/home')

  return { status: res.status, message: data.message }
};
