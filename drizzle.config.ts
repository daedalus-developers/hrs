import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: "./src/lib/server/schema/user.ts",
  dialect: 'postgresql',
  out: './migrations',
  dbCredentials: {
    url: process.env.DB_URL!
  },
  verbose: true,
})

