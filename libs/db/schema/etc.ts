import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  content: text("content"),

  likes: integer("likes").default(0),
  userId: text("userId").notNull(),
});

export const todos = sqliteTable("todos", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: text("text").notNull(),
  done: integer("done", { mode: "boolean" }).default(false).notNull(),
});
