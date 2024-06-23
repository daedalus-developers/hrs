"use server";

import { lucia } from "@server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async (_: FormData) => {
  await fetch('http://localhost:3000/api/auth/logout', {
    method: "GET",
    mode: "same-origin",
    credentials: "same-origin",
  })

  cookies().delete(lucia.sessionCookieName)

  redirect('/login')
};
