import { getPosts } from "./action";
import { PostForm } from "./form";

export default async function Page() {
  const posts = await getPosts();
  return (
    <div>
      <h1>Post</h1>
      <p>
        This is a page for posts. It shows post content and allows users to
        create new posts.
      </p>
      {JSON.stringify(posts)}
      <PostForm />
    </div>
  );
}
