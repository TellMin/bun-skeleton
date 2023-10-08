/*
  DO NOT RENAME THIS FILE FOR DRIZZLE-ORM TO WORK
*/
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('items', {
	id: integer('id').primaryKey().notNull(),
	item: text('item').notNull()
});
