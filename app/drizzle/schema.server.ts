import { pgTable, text, serial } from "drizzle-orm/pg-core"

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(), // serial is commonly used for auto-incrementing integers in PostgreSQL
  title: text("title").notNull(),
  href: text("href").notNull(),
})
