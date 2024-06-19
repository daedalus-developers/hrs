import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { hello } from "./routes/hello";

const app = new OpenAPIHono();

app.doc31("/api/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Hotel Reservation System API",
  },
});

app.get("/api/docs/ui", swaggerUI({ url: "/api/docs", spec: "spec" }));

app.route("/api", hello);
export { app };
