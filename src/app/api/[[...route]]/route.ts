import { app } from "@/server/index";
import { handle } from "hono/vercel";

export const GET = handle(app);
export const POST = handle(app);
