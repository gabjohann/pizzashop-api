import chalck from 'chalk'
import { faker } from '@faker-js/faker'

import { users, restaurants } from './schema'
import { db } from './connection'

/* RESET DATABASE */
await db.delete(users)
await db.delete(restaurants)

console.log(chalck.yellow('✓ Database reset!'))

/* CREATE CUSTOMERS */
await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalck.yellow('✓ Created customers!'))

/* CREATE MANAGER */
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  }) // retorna somente o id

console.log(chalck.yellow('✓ Created manager!'))

/* CREATE RESTAURANT */
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  },
])

console.log(chalck.yellow('✓ Created customers!'))

console.log(chalck.greenBright('Database seeded succesfully!'))

process.exit()
