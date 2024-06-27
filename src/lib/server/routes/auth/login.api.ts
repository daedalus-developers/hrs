import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { lucia } from '@server/auth';
import { queryEmail } from '@server/queries';
import { responseSchema } from '@server/schemas';
import { loginSchema } from '@server/schemas/auth';
import { ContextVars, InsertUser } from '@types';
import { Argon2id } from '@utils/argon2';
import { authMiddleware } from '../auth.middleware';

const loginSpec = createRoute({
	method: 'post',
	path: 'login',
	tags: ['Auth'],
	summary: 'Authorize user',
	middleware: [authMiddleware],
	request: {
		body: {
			description: 'Request body',
			content: {
				'application/json': {
					schema: loginSchema.openapi('Login')
				}
			},
			required: true
		}
	},
	responses: {
		200: {
			content: {
				'application/json': { schema: responseSchema }
			},
			description: 'Success'
		},
		400: {
			content: {
				'application/json': { schema: responseSchema }
			},
			description: 'Bad request'
		}
	}
});

const login = new OpenAPIHono<{ Variables: ContextVars }>().openapi(loginSpec, async (c) => {
	const { email, password } = c.req.valid('json');

	const user: InsertUser[] = await queryEmail.execute({ email: email });

	if (user.length == 0) return c.json({ message: 'Invalid email' }, 400);

	const validPassword = await new Argon2id().verify(user[0].password!, password);

	if (!validPassword) return c.json({ message: 'Invalid password' }, 400);

	const session = await lucia.createSession(user[0].id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	c.header('Set-Cookie', sessionCookie.serialize(), { append: true });

	return c.json({ message: 'Login successful' }, 200);
});

export { login };
