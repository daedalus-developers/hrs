"use server";

import { redirect } from "next/navigation";
import { client } from "../client/hono";

export const signup = async (_: any, formData: FormData) => {
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await client.api.auth.signup.$post({
    json: {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password
    }
  })

  const data = await res.text()
  if (!res.ok) return { status: res.status, message: JSON.parse(data).message }

  redirect('/verify')
};

