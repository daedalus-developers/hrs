import { z } from 'zod';

export const responseSchema = z.object({
	message: z.string()
});
const RecordStringStringSchema = z.record(z.string());

const FieldErrorsSchema = z.record(z.array(z.string()));

const FormErrorResponseSchema = z.object({
	message: z.string(),
	fields: FieldErrorsSchema.nullable()
});

export const ApiResponseSchema = z.object({
	data: z.union([RecordStringStringSchema, z.null()]),
	errors: z.union([FormErrorResponseSchema, z.string(), z.null()]).nullable(),
	status: z.number(),
	message: z.string().nullable()
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;
