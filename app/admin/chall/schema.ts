import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(3),
  flag: z.string().min(14), // TODO: format validation, regex
  tiebreakEligible: z.boolean(),
  sortWeight: z.coerce.number().int(),

  // files: z.array(z.object({
  //   name: z.string().min(1),
  //   url: z.string().min(1),

  // })),

  // points: z.object({
  //   min: z.number().int(),
  //   max: z.number().int(),
  // }),

  // dynamic: z.object({
  //   image: z.string().min(1),
  //   type: z.string().min(1),
  //   env: z.string().min(1),
  // }),
});

// export const challenges = sqliteTable("challenge", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   category: text("category").notNull(),
//   author: text("author").notNull(),
//   flag: text("flag").notNull(),
//   tiebreakEligible: integer("tiebreakEligible", { mode: "boolean" }).notNull(),
//   sortWeight: integer("sortWeight").notNull(),

//   // files: json("files").$type<File[]>().notNull(),
//   // points: json("points").$type<Points>().notNull(),
//   // dynamic: json("dynamic").$type<Dynamic>().notNull(),
// });
