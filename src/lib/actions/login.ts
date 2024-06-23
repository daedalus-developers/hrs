"use server";

import { lucia } from "@server/auth";
import { loginSchema } from "@server/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (_: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      loginSchema.parse({
        email: email,
        password: password
      }))
  })

  const data = await res.json()
  const response = { status: res.status, message: data.message }

  const cookieHeader = res.headers.get("set-cookie")?.match(/auth_session=(.*?)(?=;)/);
  if (!res.ok || !cookieHeader) return response

  cookies().set(lucia.sessionCookieName, cookieHeader[1]);

  redirect('/home')
};
