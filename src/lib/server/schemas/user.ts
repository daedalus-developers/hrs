import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  password: text("password"),
  role: text('role', { enum: ['admin', 'user'] })
    .default('user'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const verificationCodes = pgTable("verification_codes", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  email: text('email').notNull(),
  code: text("code"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    precision: 6,
  })
})

// Relations
export const usersToSessions = relations(users, ({ one }) => ({
  sessions: one(sessions)
}))

export const sessionsToUsers = relations(sessions, ({ one }) => ({
  userId: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}))

export const usersToVerificationCodes = relations(users, ({ one }) => ({
  sessions: one(verificationCodes)
}))

export const verificationCodesToUsers = relations(verificationCodes, ({ one }) => ({
  userId: one(users, {
    fields: [verificationCodes.userId],
    references: [users.id]
  })
}))

const insertUserSchema = createInsertSchema(users);
const insertSessionSchema = createInsertSchema(sessions);
const insertVerCodeSchema = createInsertSchema(verificationCodes)

const selectUserSchema = createSelectSchema(users, {
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).omit({ password: true });

const selectSessionSchema = createSelectSchema(sessions)
const selectVerCodeSchema = createSelectSchema(verificationCodes)

export {
  insertUserSchema, insertSessionSchema, insertVerCodeSchema,
  selectUserSchema, selectSessionSchema, selectVerCodeSchema
}
