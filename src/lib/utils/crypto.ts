import { generateRandomString, alphabet } from '@oslojs/crypto/random';

export const generateId = (length: number = 12): string =>
	generateRandomString(length, alphabet('a-z', '0-9'));
