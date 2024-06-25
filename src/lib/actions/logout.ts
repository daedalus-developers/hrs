"use server";

import { redirect } from "next/navigation";
import { client } from "../client/hono";
import { cookies } from "next/headers";

export const logout = async (_: FormData) => {
  client.api.auth.logout.$get()
  cookies().delete('auth-cookie')
  redirect('/login')
};
