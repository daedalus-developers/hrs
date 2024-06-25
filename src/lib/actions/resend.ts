"use server"

import { client } from "../client/hono";

export const resendCode = async (_: any, formData: FormData) => {
  const userId = formData.get("userId") as string;
  const email = formData.get("email") as string;

  const res = await client.api.auth.resend.$post({
    json: {
      userId: userId,
      email: email
    }
  })

  const data = await res.text()
  return { status: res.status, message: JSON.parse(data).message }
};
