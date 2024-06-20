'use server'

import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { deleteUserCode, insertCode } from "../server/mutations/verification-code";
import { InsertCode } from "../types/user";
import { generateIdFromEntropySize } from "lucia";
import { insertUser } from "../server/mutations/user";
import { lucia } from "../server/auth";
import { cookies } from "next/headers";
import { queryEmail } from "../server/queries/user";
import { sendEmailVerificationCode } from "../server/mailer";
import * as argon2 from "argon2";

const generateEmailVerificationCode = async (userId: string, email: string): Promise<string> => {
  await deleteUserCode(userId);
  const code = generateRandomString(8, alphabet("0-9"));

  const verificationCode: InsertCode = {
    id: generateIdFromEntropySize(10),
    userId: userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(15, "m")) // 15 minutes
  };
  await insertCode(verificationCode);

  return code;
}

const isValidEmail = (email: string): boolean => {
  return /.+@.+/.test(email);
}

const checkEmail = async (email: string): Promise<{ message: string } | undefined> => {
  const result = await queryEmail.execute({ email: email });
  if (result?.length > 0) return { message: "Email already exists" }
  return
}

export const signup = async (prevState: any, formData: FormData) => {
  const lastName = formData.get('lastName') as string;
  const firstName = formData.get('firstName') as string;
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || typeof email !== "string" || !isValidEmail(email)) return { message: "Invalid email" }
  if (!password || typeof password !== "string" || password.length < 6) return { message: "Invalid password" }

  checkEmail(email);

  const userId = generateIdFromEntropySize(10);
  const passwordHash = await argon2.hash(password)

  const user = {
    id: userId,
    lastName: lastName,
    firstName: firstName,
    email: email,
    emailVerified: false,
    password: passwordHash
  };

  console.log(passwordHash)


  await insertUser(user)

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  console.log("cookeis successfully set")

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(email, verificationCode);

  return { message: "Account successfully registered." }
}
