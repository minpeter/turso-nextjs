"use server";

import db from "@/libs/db/drizzle";

export const getChalls = async () => {
  const data = await db.query.challenges.findMany();

  const result = data.map((d) => {
    const { flag, dynamicImage, ...rest } = d;
    return {
      ...rest,
      points: Math.floor(Math.random() * 100),
      solves: Math.floor(Math.random() * 100),
    };
  });

  return {
    data: result,
    error: null,
    notStarted: false,
  };
};
