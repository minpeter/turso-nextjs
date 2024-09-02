"use server";

import db from "@/libs/db/drizzle";
import { posts } from "@/libs/db/schema/etc";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "./schema";
import { auth } from "@/auth";
import { challenges } from "@/libs/db/schema/challenges";

export const getChalls = async () => {
  return await db.query.challenges.findMany();
};

export async function createChalls(values: z.infer<typeof formSchema>) {
  try {
    const result = formSchema.safeParse(values);
    if (!result.success) {
      return { error: "Invalid data", details: result.error.flatten() };
    }

    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    try {
      await db.insert(challenges).values({
        name: values.name,
        description: values.description,
        category: values.category,
        author: values.author,
        flag: values.flag,
        tiebreakEligible: values.tiebreakEligible,
        sortWeight: values.sortWeight,
        minPoints: values.minPoints,
        maxPoints: values.maxPoints,
        dynamic: values.dynamic,
        dynamicImage: values.dynamicImage,
        dynamicType: values.dynamicType,
      });
    } catch (error) {
      console.error("Error inserting challenge:", error);
      return { error: "An unexpected error occurred" };
    }

    revalidatePath("/admin/chall");
    return { success: true };
  } catch (error) {
    console.error("Post creation error:", error);
    return { error: "An unexpected error occurred" };
  }
}
