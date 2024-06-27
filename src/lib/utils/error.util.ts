import { ZodError } from 'zod';
import { FormErrorResponse, MappedFieldErrors, FieldErrors } from '@types';

/**
 * @template T = FieldErrors - Generic type
 * @param message -  String
 * @param zodError - Errors from zod
 * @returns MappedFieldErrors<T>
 */
export function processZodError<T = FieldErrors>(
	message: string = 'Invalid form',
	zodError: ZodError<any>
): FormErrorResponse {
	const fields: Partial<MappedFieldErrors<T>> = {};

	zodError.errors.forEach((error) => {
		if (error.path.length > 0) {
			const fieldName = error.path[0] as keyof T;
			if (!fields[fieldName]) {
				fields[fieldName] = [];
			}
			(fields[fieldName] as string[]).push(error.message);
		}
	});

	return {
		message,
		fields: fields as MappedFieldErrors<T>
	};
}
