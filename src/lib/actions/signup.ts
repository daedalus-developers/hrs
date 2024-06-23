"use server";

import { lucia } from "@server/auth";
import { signupSchema } from "@server/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (_: any, formData: FormData) => {
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch('http://localhost:3000/api/auth/signup', {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      signupSchema.parse({
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password
      }))
  })

  const data = await res.json()
  const response = { status: res.status, message: data.message }

  const cookieHeader = res.headers.get("set-cookie")?.match(/auth_session=(.*?)(?=;)/);
  if (!res.ok || !cookieHeader) return response

  cookies().set(lucia.sessionCookieName, cookieHeader[1]);

  redirect('/verify')
};

