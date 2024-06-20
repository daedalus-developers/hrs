import { sql, eq, and } from "drizzle-orm";
import { db } from "../db";
import { users, verificationCodes } from "@schemas";

export const queryEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")));

export const queryVerificationCode = db
  .select()
  .from(verificationCodes)
  .where(
    and(
      eq(verificationCodes.userId, sql.placeholder("userId")),
      eq(verificationCodes.code, sql.placeholder("code")),
    ),
  );
