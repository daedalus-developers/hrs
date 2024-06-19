import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const permissions = pgTable("permissions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: text("role_id").notNull(),
    permissionId: text("permission_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.roleId, table.permissionId],
      }),
    };
  },
);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role_id").references(() => roles.id),
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
