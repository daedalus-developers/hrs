import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field cannot be empty." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Invalid password" })
    .max(64, { message: "Invalid password" }),
});

export const signupSchema = z.object({
  lastName: z.string().min(1, { message: "This field cannot be empty." }),
  firstName: z.string().min(1, { message: "This field cannot be empty." }),
  email: z
    .string()
    .min(1, { message: "This field cannot be empty." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(64, { message: "Password must be at most 64 characters." }),
});

export const verifySchema = z.object({
  userId: z.string(),
  code: z.string(),
});

export const resendSchema = z.object({
  userId: z.string(),
  email: z.string(),
});
