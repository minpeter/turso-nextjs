"use server";

import { getPosts } from "./action";
import { PostForm } from "./form";

export default async function Page() {
  const post = await getPosts();
  return (
    <div>
      <h1>Post</h1>
      <p>
        This is a page for a post. It will show the post content and allow users
        to like the post.
      </p>

      {JSON.stringify(post)}

      <PostForm />
    </div>
  );
}
