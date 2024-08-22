import { SignIn } from "@/components/auth/signin-button";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24">
      <i>drizzle + nextjs + authjs + turso</i>
      {session ? <SignOut /> : <SignIn />}

      <i>
        {session?.user
          ? `Signed in as ${session.user.name} (${session.user.email})`
          : "You are not signed in"}
      </i>
    </main>
  );
}
