import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from './user';
import { sql } from 'drizzle-orm';

export const messageTable = pgTable('messages', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    content: text().notNull(),
    senderId: integer('sender_id')
        .notNull()
        .references(() => userTable.id),
    createdAt: timestamp('created_at', { mode: 'date' }).default(
        sql`CURRENT_TIMESTAMP`
    ),
});

export type NewMessage = typeof messageTable.$inferInsert;
export type Message = typeof messageTable.$inferSelect;
