import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
});
