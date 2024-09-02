"use server";

import db from "@/libs/db/drizzle";
import { posts } from "@/libs/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "./schema";
import { auth } from "@/auth";

export const getPosts = async () => {
  return await db.query.posts.findMany();
};
export async function createPost(values: z.infer<typeof formSchema>) {
  try {
    const result = formSchema.safeParse(values);
    if (!result.success) {
      return { error: "Invalid data", details: result.error.flatten() };
    }

    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    await db.insert(posts).values({
      userId: session.user.id,
      title: values.title,
      content: values.content,
    });

    revalidatePath("/post");
    return { success: true };
  } catch (error) {
    console.error("Post creation error:", error);
    return { error: "An unexpected error occurred" };
  }
}
