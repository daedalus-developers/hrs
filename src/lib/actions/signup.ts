"use server";

import { createSession } from "@server/auth";
import { insertUser } from "@mutations";
import { queryEmail } from "@queries";
import { Argon2id } from "@utils/argon2";
import { generateIdFromEntropySize } from "lucia";
import { generateEmailVerificationCode } from "./verify";
import { sendEmailVerificationCode } from "@server/mailer";

const isValidEmail = (email: string): boolean => {
  return /.+@.+/.test(email);
};

export const signup = async (prevState: any, formData: FormData) => {
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || typeof email !== "string" || !isValidEmail(email))
    return { status: 400, message: "Invalid email" };
  if (!password || typeof password !== "string" || password.length < 6)
    return { status: 400, message: "Invalid password" };

  const result = await queryEmail.execute({ email: email });
  if (result?.length > 0)
    return { status: 400, message: "Email already exists" };

  const userId = generateIdFromEntropySize(10);

  const passwordHash = await new Argon2id().hash(password);

  const user = {
    id: userId,
    lastName: lastName,
    firstName: firstName,
    email: email,
    emailVerified: false,
    password: passwordHash,
  };

  await insertUser(user); // Save user to DB

  await createSession(userId); // Create session cookies

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(
    email,
    verificationCode.code!,
    verificationCode.expiresAt!.toString(),
  );

  return { status: 200, message: "Account successfully registered." };
};
