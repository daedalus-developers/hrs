import { InsertUser, InsertCode } from "@/lib/types/user";
import { users, verificationCodes } from "../schema/user";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const insertUser = (user: InsertUser) => db.insert(users).values(user);

export const updateEmailVerified = (userId: string) =>
  db
    .update(users)
    .set({
      emailVerified: true
    })
    .where(eq(users.id, userId));

export const insertCode = (code: InsertCode) => db.insert(verificationCodes).values(code);
export const deleteUserCode = (userId: string) => db.delete(verificationCodes).where(eq(verificationCodes.userId, userId)).returning();
