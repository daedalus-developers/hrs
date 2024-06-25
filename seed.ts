import path from 'path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './src/lib/server/schemas';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Argon2id } from './src/lib/utils/argon2';
import postgres from 'postgres';
import { exit } from 'process';
import 'dotenv/config';
import { generateId } from './src/lib/utils/crypto';
import type { InferInsertModel } from 'drizzle-orm';

type UserInsert = InferInsertModel<typeof schema.users>;

const seedDefaultUsers = async () => {
	const users: UserInsert[] = [
		{
			firstName: 'super',
			lastName: 'user',
			id: generateId(5),
			email: 'super@local.dev',
			password: await new Argon2id().hash('superuser')
		},
		{
			id: generateId(5),
			firstName: 'admin',
			lastName: 'user',
			email: 'admin@local.dev',
			password: await new Argon2id().hash('admin')
		},
		{
			id: generateId(5),
			firstName: 'client',
			lastName: 'user',
			email: 'client1@local.dev',
			password: await new Argon2id().hash('client1')
		}
	];
	return { users };
};

(async () => {
	const client = postgres(process.env.DATABASE_URL!);

	const db = drizzle(client, {
		schema
	});

	try {
		migrate(db, { migrationsFolder: path.resolve('./migrations') });
	} catch (error) {
		console.log('Database in sync with migrations. Starting server...');
	} finally {
		console.log('Seeding Database...');
		const { users } = await seedDefaultUsers();

		await db.transaction(async (tx) => {
			await tx.insert(schema.users).values(users);
		});

		console.log('Database Migrated.');
		exit(0);
	}
})();
