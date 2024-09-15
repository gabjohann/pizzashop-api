import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from '../env'

const connection = postgres(env.DB_URL, { max: 1 })

const dbConnection = drizzle(connection)

await migrate(dbConnection, { migrationsFolder: 'drizzle' })

await connection.end()

process.exit()
