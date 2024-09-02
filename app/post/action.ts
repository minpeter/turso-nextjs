"use server";

import db from "@/libs/db/drizzle";
import { z } from "zod";
import { formSchema } from "./schema";
import { posts } from "@/libs/db/schema";
import { revalidatePath } from "next/cache";

export const getPosts = async () => {
  const post = await db.query.posts.findMany();

  console.log(post);

  return post;
};

export async function createPost(values: z.infer<typeof formSchema>) {
  "use server";

  console.log(values);

  await db.insert(posts).values({
    userId: "dd",
    title: values.title,
    content: values.content,
  });

  revalidatePath("/post");
}
