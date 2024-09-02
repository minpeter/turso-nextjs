import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3),
  content: z.string(),
});
