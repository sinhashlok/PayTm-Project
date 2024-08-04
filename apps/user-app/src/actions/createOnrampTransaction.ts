"use server";

import { db } from "../lib/db";
import { getSession } from "./session";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider
  const user = await getSession();
  if (!user) {
    return { message: "Unauthenticated request" };
  }

  const token = (Math.random() * 1000).toString();
  await db.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(user?.id),
      amount: amount * 100,
    },
  });

  return { message: "Done" };
}
