import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

const connection = postgres(
  'postgresql://docker:docker@localhost:5432/pizzashop',
  { max: 1 }
)

const dbConnection = drizzle(connection)

await migrate(dbConnection, { migrationsFolder: 'drizzle' })

await connection.end()

process.exit()
