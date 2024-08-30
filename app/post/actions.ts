// "use server";

// import { auth } from "@/auth";
// import { db } from "@/libs/db/index";
// import { posts } from "@/libs/db/schema";
// import { revalidatePath } from "next/cache";

// export const incrementLike = async (id: string) => {
//   console.log("Incrementing like");

//   const post = await prisma.post.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!post) {
//     throw new Error("Post not found");
//   }

//   const updatedPost = await prisma.post.update({
//     where: {
//       id,
//     },
//     data: {
//       likes: {
//         increment: 1,
//       },
//     },
//   });

//   // 딜레이 추가
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   return updatedPost.likes;
// };

// export const deletePost = async ({ id }: { id: string }) => {
//   console.log("Deleting post", id);

//   await prisma.post.delete({
//     where: {
//       id,
//     },
//   });
// };

// export const createPost = async (FormData: FormData) => {
//   const session = await auth();

//   const post = await prisma.post.create({
//     data: {
//       title: FormData.get("title") as string,
//       content: FormData.get("content") as string,
//       user: {
//         connect: {
//           id: session?.user?.id,
//         },
//       },
//     },
//   });

//   console.log(post);

//   revalidatePath("/post");
// };
