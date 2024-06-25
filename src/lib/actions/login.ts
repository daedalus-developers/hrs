"use server";

import { redirect } from "next/navigation";
import { client } from "../client/hono";
import { cookies } from "next/headers";

export const login = async (_: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await client.api.auth.login.$post(
    {
      json: {
        email: email,
        password: password
      }
    }
  )

  cookies().set('auth-cookie', res.headers.getSetCookie()[0])

  const data = await res.text()
  if (!res.ok) return { status: res.status, message: JSON.parse(data).message }

  redirect('/home')
};
