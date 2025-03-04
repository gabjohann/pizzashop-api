import chalk from 'chalk'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from '../env'

const connection = postgres(env.DB_URL, { max: 1 })

const dbConnection = drizzle(connection)

await migrate(dbConnection, { migrationsFolder: 'drizzle' })

console.log(chalk.greenBright('Migrations applied succesfully!'))

await connection.end()

process.exit()
