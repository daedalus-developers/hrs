import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./src/lib/server/schema/user.ts",
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    url: 'postgres://hrs:pass@localhost:5432/hrs',
  },
  verbose: true,
  strict: true,
})

