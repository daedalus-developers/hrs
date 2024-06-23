import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { hello } from "./routes/hello";
import { healthceck } from "./routes/healthcheck";
import { time } from "./routes/time";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { showRoutes } from "hono/dev";
import { auth } from "./routes/auth";
import { lucia } from "./auth";
import { getCookie, setCookie } from "hono/cookie";


const app = new OpenAPIHono()
  .doc("/api/docs", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Hotel Reservation System API",
    },
  })
  .get("/api/docs/ui", swaggerUI({ url: "/api/docs", spec: "spec" }))
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .use("*", async (c, next) => {
    console.log("at middleware")
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;

    if (!sessionId) return next()
    const { session } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        sameSite: 'Strict',
      });

    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        sameSite: 'Strict',
      });
    }
    return next();
  })
  .use("/api/*", prettyJSON())
  .use("/api/*", logger())
  .notFound((c) => c.json({ message: "Not Found", ok: false }, 404))
  .route("/api", hello)
  .route("/api", healthceck)
  .route("/api", time)
  .route("/api/auth", auth)

showRoutes(app);

export type AppType = typeof app;

export { app };
