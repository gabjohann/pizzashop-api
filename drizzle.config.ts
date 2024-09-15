import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './src/db/schema/index.ts',
  dbCredentials: {
    url: env.DB_URL,
  },
})

console.log(env.DB_URL)
