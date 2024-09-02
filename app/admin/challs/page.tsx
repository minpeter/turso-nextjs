import { getChalls } from "./action";
import { ChallForm } from "./form";

export default async function Page() {
  const data = await getChalls();
  return (
    <div className="space-y-8 w-full max-w-screen-md mx-auto">
      <h1>Challenges</h1>
      <p>
        This is a page for managing challenges. You can create, update, and
        delete challenges here.
      </p>

      <div className="flex overflow-scroll gap-2">
        {data.map((problem) => (
          <div
            className="space-y-4 whitespace-pre-wrap shrink-0 text-sm bg-gray-100 rounded-md p-4 w-fit"
            key={problem.id}
          >
            {JSON.stringify(problem, null, 2)}
          </div>
        ))}
      </div>
      <ChallForm />
    </div>
  );
}
