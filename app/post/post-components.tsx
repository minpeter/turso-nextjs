"use client";

import Link from "next/link";
import { createPost } from "@/app/post/actions";
import { Post } from "@prisma/client";
import { useOptimistic, useRef } from "react";

export default function PostComponents({ posts }: { posts: Post[] }) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic<Post[], Post>(
    posts,
    (state, newPost) => [...state, newPost]
  );

  const ref = useRef<HTMLFormElement>(null);
  return (
    <>
      <form
        action={async (FormData) => {
          ref.current?.reset();

          const title = FormData.get("title") as string;
          const content = FormData.get("content") as string;

          addOptimisticPost({
            title,
            content,

            likes: 0,
            id: "temp",
            userId: "temp",
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await createPost(FormData);
        }}
        className="mb-8"
        ref={ref}
      >
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Create Post
        </button>

        <div className="mt-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Content"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
      </form>

      <ul className="space-y-4">
        {optimisticPosts.map((post) => (
          <li
            key={post.id}
            className="border-b border-gray-200 pb-2 hover:underline"
          >
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
