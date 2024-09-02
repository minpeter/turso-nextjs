import Problem from "@/components/problem";
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

      <Problem
        // key={problem.id}

        // problem={problem}
        problem={{
          ...data[1],
          files: [],
          points: 100,
          solves: 0,
        }}
        // solved={solveIDs.includes(problem.id)}
        solved={false}
        // setSolved={setSolved}
      />

      <div className="space-y-4 whitespace-pre-wrap bg-gray-100 rounded-md p-5 max-h-64 overflow-scroll">
        {JSON.stringify(data, null, 2)}
      </div>
      <ChallForm />
    </div>
  );
}
