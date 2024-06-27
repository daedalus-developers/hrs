export * from './user.type';
export * from './variables.type';

/**
 * @description A Record Representation of Field Errors
 */
export type FieldErrors = Record<string, string[]>;

/**
 * @description Mapped Field Errors Maps it to the original key's of the schema
 */
export type MappedFieldErrors<T = FieldErrors> = {
	[K in keyof T]: string[];
};

/**
 * @description The Response returned when the form is invalid
 */
export type FormErrorResponse<T = FieldErrors> = {
	message: string;
	fields: MappedFieldErrors<Partial<T>>;
};

export type ApiResponse<T> = {
	data: T | null;
	errors: FormErrorResponse | string | null;
	status: number;
	message: string | null;
};
