import { min } from "drizzle-orm";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  author: z.string().optional(),
  flag: z
    .string()
    .min(6, {
      message: "Flag must be at least 6 characters.",
    })
    .regex(/\{.*\}$/, "Flag must be in the format of xxx{xxx}"),
  tiebreakEligible: z.boolean(),
  sortWeight: z.coerce.number().int(),

  minPoints: z.coerce.number().min(1, {
    message: "Minimum points must be at least 1.",
  }),
  maxPoints: z.coerce.number().min(2, {
    message: "Maximum points must be at least 2.",
  }),

  dynamic: z.boolean(),
  // dynamicEnv: z.array(
  //   z.object({
  //     key: z.string().min(1),
  //     value: z.string().min(1),
  //   })
  // ),
  dynamicImage: z.string().min(1).optional(),
  dynamicType: z.enum(["tcp", "http", "static"]).optional(),
});
