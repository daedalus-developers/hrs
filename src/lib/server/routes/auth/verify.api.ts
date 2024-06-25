import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { updateEmailVerified } from "@server/mutations";
import { queryVerificationCode } from "@server/queries";
import { responseSchema, verifySchema } from "@server/schemas";
import { ContextVars } from "@types";
import { authMiddleware } from "../auth.middleware";

const verifySpec = createRoute({
  method: 'post',
  path: 'verify',
  tags: ['Auth'],
  summary: 'Verify user email',
  middleware: [authMiddleware],
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: verifySchema.openapi('Verify'),
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
    400: {
      content: {
        "application/json": { schema: responseSchema },
      },
      description: 'Bad request',
    },
  },
})

const verify = new OpenAPIHono<{ Variables: ContextVars }>().openapi(verifySpec, async (c) => {
  const { userId, code } = c.req.valid('json');

  const verificationCodes = await queryVerificationCode.execute({
    userId: userId,
    code: code,
  });

  if (verificationCodes.length == 0) return c.json({ message: "Invalid verification code" }, 400)

  await updateEmailVerified(userId);

  return c.json({ message: "Account successfully verified." });
})

export { verify }
