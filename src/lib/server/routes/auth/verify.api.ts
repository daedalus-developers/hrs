import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { updateEmailVerified } from "@server/mutations";
import { queryVerificationCode } from "@server/queries";
import { responseSchema, verifySchema } from "@server/schemas";
import { HTTPException } from "hono/http-exception";

const verifySpec = createRoute({
  method: 'post',
  path: 'verify',
  tags: ['Auth'],
  summary: 'Verify user email',
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
  },
})

const verify = new OpenAPIHono().openapi(verifySpec, async (c) => {
  const { userId, code } = c.req.valid('json');

  const verificationCodes = await queryVerificationCode.execute({
    userId: userId,
    code: code,
  });

  if (verificationCodes.length == 0) {
    throw new HTTPException(400, {
      message: 'Invalid verification code',
    });
  }

  await updateEmailVerified(userId);

  return c.json({ message: "Account successfully verified." });
})

export { verify }
