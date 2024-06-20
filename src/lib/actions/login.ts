'use server'

import { queryEmail } from "../server/queries/user"
import * as argon2 from "argon2";
import { SelectUser } from "../types/user";
import { createSession } from "../server/auth";

export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user: SelectUser[] = await queryEmail.execute({ email: email });

  if (user.length == 0) return { status: 400, message: 'Invalid email' }

  const validPassword = await argon2.verify(user[0].password, password)
  if (!validPassword) return { status: 400, message: 'Invalid password' }

  await createSession(user[0].id)
  return { status: 200, message: 'Login successful!' }
} 
