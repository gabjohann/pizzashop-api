import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const restaurants = pgTable('restaurants', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  managerId: text('manager_id').references(() => users.id, {
    onDelete: 'set null', // caso usuário seja deletado, não deleta o restaurante
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// exportando o reolacionamento entre as tabelas many to one (restaurants <-> users)
export const restaurantsRelations = relations(restaurants, ({ one }) => {
  return {
    manager: one(users, {
      fields: [restaurants.managerId],
      references: [users.id],
      relationName: 'restaurant_manager',
    }),
  }
})
