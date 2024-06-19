import { app } from "@/lib/server";
import { handle } from "hono/vercel";

export const GET = handle(app);
export const POST = handle(app);
