"use server";

import db from "@/libs/db/drizzle";

export const getChalls = async () => {
  const data = await db.query.challenges.findMany();

  // points: number;
  // solves: number;

  // 를 계산해서 data에 추가해줘야 함, 일단 랜덤으로
  //TODO: 이 부분을 실제 데이터를 가지고 계산해야 함

  const result = data.map((d) => {
    return {
      ...d,
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
