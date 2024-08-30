import prisma from "@/db";
import { DeleteButton, LikeButton } from "./button";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <i className="text-gray-500 text-sm">{params.id}</i>

      <h1 className="text-3xl font-bold my-4 text-gray-800">{post?.title}</h1>

      <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
        {post?.content}
      </p>

      <div className="flex items-center justify-between">
        <LikeButton id={params.id} initialLikes={post?.likes || 0} />
        <DeleteButton id={params.id} />
      </div>
    </div>
  );
}
