import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { sendEmailVerificationCode } from "@server/mailer";
import { resendSchema, responseSchema } from "@server/schemas";
import { generateEmailVerificationCode } from "@server/services/verification";

const resendSpec = createRoute({
  method: 'post',
  path: 'resend',
  tags: ['Auth'],
  summary: 'Resend verification code',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: resendSchema.openapi('Verify'),
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

const resend = new OpenAPIHono().openapi(resendSpec, async (c) => {
  const { userId, email } = c.req.valid('json')

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(
    email,
    verificationCode.code!,
    verificationCode.expiresAt!.toString(),
  );

  return c.json({ message: "Resent verification code" })
})

export { resend }
