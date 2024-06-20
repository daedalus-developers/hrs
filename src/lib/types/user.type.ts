import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sessions, users, verificationCodes } from "@schemas/user";

export type InsertUser = InferInsertModel<typeof users>;
export type InsertSession = InferInsertModel<typeof sessions>;
export type InsertCode = InferInsertModel<typeof verificationCodes>;

export type SelectUser = InferSelectModel<typeof users>;
export type SelectSession = InferSelectModel<typeof sessions>;
export type SelectCode = InferSelectModel<typeof verificationCodes>;
