// import { getUserById } from "@/libs/db/queries/select";

import { SignIn } from "@/components/auth/signin-button";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";

export default async function Home() {
  // const currentUser = await getUserById(1234);

  // console.log(currentUser);

  // [
  //   {
  //     id: 1234,
  //     name: 'minpeter',
  //     age: 13,
  //     email: 'kali2005611@gmail.com'
  //   }
  // ]

  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24">
      {/* {currentUser.map((user) => (
        <div key={user.id} className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Hello, {user.name}</h1>
          <p className="text-lg">Your email is {user.email}</p>
        </div>
      ))} */}
      <i>drizzle + nextjs + authjs + turso</i>
      {session ? <SignOut /> : <SignIn />}

      <i>
        {session
          ? `Signed in as ${session?.user?.name}`
          : "You are not signed in"}
      </i>
    </main>
  );
}
