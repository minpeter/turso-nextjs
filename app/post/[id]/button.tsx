"use client";

import { useRouter } from "next/navigation";
import { deletePost, incrementLike } from "@/app/post/actions";
import { useOptimistic, useState } from "react";

export function LikeButton({
  id,
  initialLikes,
}: {
  id: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLikes] = useOptimistic<number, number>(
    likes,
    (state, newLike) => state + newLike
  );

  return (
    <>
      <p>Total Likes: {optimisticLikes}</p>
      <button
        disabled={optimisticLikes > likes}
        onClick={async () => {
          addOptimisticLikes(1);
          const updatedLikes = await incrementLike(id);
          setLikes(updatedLikes);
        }}
      >
        Like
      </button>
    </>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const route = useRouter();
  return (
    <button
      onClick={async () => {
        console.log("Deleting post", id);
        deletePost({ id });
        route.push("/post");
      }}
    >
      Delete
    </button>
  );
}
