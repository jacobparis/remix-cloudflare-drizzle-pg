import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { configDotenv } from "dotenv"

configDotenv({
  path: ".dev.vars",
})

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const migrationClient = postgres(process.env.DATABASE_URL, {
  max: 1,
})

// This will run migrations on the database, skipping the ones already applied
await migrate(drizzle(migrationClient), {
  migrationsSchema: "./app/drizzle/schema.server.ts",
  migrationsFolder: "./app/drizzle/migrations",
})

await migrationClient.end()
