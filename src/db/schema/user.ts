import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    hashPassword: varchar('hash_password', { length: 60 }).notNull(),
});

export type NewUser = typeof userTable.$inferInsert;
export type User = typeof userTable.$inferSelect;
