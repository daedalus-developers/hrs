'use server'

import { updateEmailVerified } from "../server/mutations/user"
import { queryVerificationCode } from "../server/queries/user"
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { deleteUserCode, insertCode } from "../server/mutations/user";
import { InsertCode } from "../types/user";
import { generateIdFromEntropySize } from "lucia";
import { sendEmailVerificationCode } from "../server/mailer";

export const verifyAccount = async (prevState: any, formData: FormData) => {
  const userId = formData.get('userId') as string
  const code = formData.get('code') as string
  const verificationCodes = await queryVerificationCode.execute({ userId: userId, code: code })
  if (verificationCodes.length == 0) return { status: 400, message: 'Invalid verification code' }
  await updateEmailVerified(userId);

  return { status: 200, message: 'Account successfully verified.' }
}

export const resendVerificationCode = async (formData: FormData) => {
  const userId = formData.get('userId') as string
  const email = formData.get('email') as string
  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(
    email,
    verificationCode.code!,
    verificationCode.expiresAt!.toString()
  );

  console.log('Resent verification code')
}

export const generateEmailVerificationCode = async (userId: string, email: string): Promise<InsertCode> => {
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

  return verificationCode
}
