import { OpenAPIHono } from "@hono/zod-openapi";
import { login } from "./login.api";
import { logout } from "./logout.api";
import { signup } from "./signup.api";
import { verify } from "./verify.api";
import { resend } from "./resend.api";


const auth = new OpenAPIHono<{}>()
  .route('/', login)
  .route('/', logout)
  .route('/', signup)
  .route('/', verify)
  .route('/', resend);

export { auth }
