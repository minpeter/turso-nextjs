import { min } from "drizzle-orm";
import { integer, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const challenges = sqliteTable("challenge", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  author: text("author"),
  flag: text("flag").notNull(),
  tiebreakEligible: integer("tiebreakEligible", { mode: "boolean" }).notNull(),
  sortWeight: integer("sortWeight").notNull(),

  minPoints: integer("minPoints").notNull(),
  maxPoints: integer("maxPoints").notNull(),

  dynamic: integer("dynamic", { mode: "boolean" }).notNull(),
  dynamicImage: text("dynamicImage"),
  dynamicType: text("dynamicType"),

  // dynamicEnv: z.array(
  //   z.object({
  //     key: z.string().min(1),
  //     value: z.string().min(1),
  //   })
  // ),
});
