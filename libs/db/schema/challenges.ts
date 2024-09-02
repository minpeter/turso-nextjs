import { integer, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const challenges = sqliteTable("challenge", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  flag: text("flag").notNull(),
  tiebreakEligible: integer("tiebreakEligible", { mode: "boolean" }).notNull(),
  sortWeight: integer("sortWeight").notNull(),
});
