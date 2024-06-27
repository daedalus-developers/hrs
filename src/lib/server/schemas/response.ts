import { z } from 'zod';

export const responseSchema = z.object({
	message: z.string()
});
