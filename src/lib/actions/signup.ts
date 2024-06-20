'use server'

import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { deleteUserCode, insertCode } from "../server/mutations/verification-code";
import { InsertCode } from "../types/user";
import { generateIdFromEntropySize } from "lucia";
import { insertUser } from "../server/mutations/user";
import { queryEmail } from "../server/queries/user";
import { sendEmailVerificationCode } from "../server/mailer";
import * as argon2 from "argon2";
import { createSession } from "../server/auth";

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

export const signup = async (prevState: any, formData: FormData) => {
  const lastName = formData.get('lastName') as string;
  const firstName = formData.get('firstName') as string;
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || typeof email !== "string" || !isValidEmail(email)) return { status: 400, message: "Invalid email" }
  if (!password || typeof password !== "string" || password.length < 6) return { status: 400, message: "Invalid password" }

  const result = await queryEmail.execute({ email: email });
  if (result?.length > 0) return { status: 400, message: "Email already exists" }

  const userId = generateIdFromEntropySize(10)
  const passwordHash = await argon2.hash(password)

  const user = {
    id: userId,
    lastName: lastName,
    firstName: firstName,
    email: email,
    emailVerified: false,
    password: passwordHash
  };

  await insertUser(user) // Save user to DB
  await createSession(userId) // Create session cookies

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(email, verificationCode);

  return { status: 200, message: "Account successfully registered." }
}
