"use server";

import db from "@/libs/db/drizzle";

export const getChalls = async () => {
  // return await db.query.challenges.findMany();

  // {
  //   data?: ProblemProps[] | null;
  //   error?: string | null;
  //   notStarted?: boolean;
  // }

  // 형식으로 리턴

  const data = await db.query.challenges.findMany();

  return {
    data,
    error: null,
    notStarted: false,
  };
};
