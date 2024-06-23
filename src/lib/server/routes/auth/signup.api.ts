import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { lucia } from "@server/auth";
import { sendEmailVerificationCode } from "@server/mailer";
import { insertUser } from "@server/mutations";
import { queryEmail } from "@server/queries";
import { responseSchema } from "@server/schemas";
import { signupSchema } from "@server/schemas/auth";
import { generateEmailVerificationCode } from "@server/services/verification";
import { Argon2id } from "@utils/argon2";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { generateIdFromEntropySize } from "lucia";

const signupSpec = createRoute({
  method: 'post',
  path: 'signup',
  tags: ['Auth'],
  summary: 'Register user',
  request: {
    body: {
      description: 'Request body',
      content: {
        "application/json": { schema: signupSchema.openapi('Signup') },
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

const signup = new OpenAPIHono().openapi(signupSpec, async (c) => {
  const { lastName, firstName, email, password } = c.req.valid('json');

  const result = await queryEmail.execute({ email: email });
  if (result?.length > 0) {
    throw new HTTPException(400, {
      message: 'Email already taken.',
    });
  }

  const userId = generateIdFromEntropySize(10);

  const passwordHash = await new Argon2id().hash(password);

  const user = {
    id: userId,
    lastName: lastName,
    firstName: firstName,
    email: email,
    emailVerified: false,
    password: passwordHash,
  };

  await insertUser(user);

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    sameSite: 'Strict',
  });

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(
    email,
    verificationCode.code!,
    verificationCode.expiresAt!.toString(),
  );

  return c.json({ message: "Signup sucessful." })
})

export { signup }
