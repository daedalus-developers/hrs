import { alphabet, generateRandomString } from "@oslojs/crypto/random";
import { deleteUserCode, insertCode } from "@server/mutations";
import { InsertCode } from "@types";
import { TimeSpan, createDate } from "@utils/timespan";
import { generateIdFromEntropySize } from "lucia";

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
): Promise<InsertCode> => {
  await deleteUserCode(userId);
  const code = generateRandomString(8, alphabet("0-9"));
  const verificationCode: InsertCode = {
    id: generateIdFromEntropySize(10),
    userId: userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(15, "m")), // 15 minutes
  };

  await insertCode(verificationCode);

  return verificationCode;
};
