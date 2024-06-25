import { insertSessionSchema, insertUserSchema, insertVerCodeSchema, selectSessionSchema, selectUserSchema, selectVerCodeSchema } from "@schemas/user";
import { z } from "zod";

export type InsertUser = z.infer<typeof insertUserSchema>
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type InsertCode = z.infer<typeof insertVerCodeSchema>;

export type SelectUser = z.infer<typeof selectUserSchema>
export type SelectSession = z.infer<typeof selectSessionSchema>
export type SelectCode = z.infer<typeof selectVerCodeSchema>;

