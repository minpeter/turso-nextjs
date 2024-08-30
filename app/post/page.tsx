import { db } from "@/libs/db/index";
import { posts } from "@/libs/db/schema";
import { auth } from "@/auth";

import PostComponents from "./post-components";

export default async function Page() {
  const data = await db.select().from(posts);

  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Post</h1>
      <PostComponents posts={data} />
    </div>
  );
}
