"use server";

import { redirect } from "next/navigation";
import { client } from "../client/hono";

export const verifyAccount = async (_: any, formData: FormData) => {
  const userId = formData.get("userId") as string;
  const code = formData.get("code") as string;

  const res = await client.api.auth.verify.$post({
    json: {
      userId: userId,
      code: code
    }
  })

  const data = await res.text()
  if (!res.ok) return { status: res.status, message: JSON.parse(data).message }

  redirect('/home')
};
