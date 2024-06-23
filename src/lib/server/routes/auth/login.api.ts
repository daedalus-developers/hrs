import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { lucia } from "@server/auth";
import { queryEmail } from "@server/queries";
import { responseSchema } from "@server/schemas";
import { loginSchema } from "@server/schemas/auth";
import { SelectUser } from "@types";
import { Argon2id } from "@utils/argon2";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

const loginSpec = createRoute({
  method: 'post',
  path: 'login',
  tags: ['Auth'],
  summary: 'Authorize user',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: loginSchema.openapi('Login'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: responseSchema },
      },
      description: 'Success',
    },
  },
})

const login = new OpenAPIHono().openapi(loginSpec, async (c) => {
  const { email, password } = c.req.valid('json');

  const user: SelectUser[] = await queryEmail.execute({ email: email });

  if (user.length == 0) {
    throw new HTTPException(400, {
      message: 'Invalid email.'
    });
  }

  const validPassword = await new Argon2id().verify(user[0].password, password);

  if (!validPassword) {
    throw new HTTPException(400, {
      message: 'Invalid password.'
    });
  }

  const session = await lucia.createSession(user[0].id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    sameSite: 'Strict',
  });


  return c.json({ message: "Login successful" })
})

export { login }
