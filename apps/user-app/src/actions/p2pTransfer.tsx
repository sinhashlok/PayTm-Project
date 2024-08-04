"use server";

import { getSession } from "./session";
import { db } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function p2pTransfer(to: string, amount: number) {
  try {
    console.log(amount);

    const user = await getSession();
    if (!user) {
      return {
        message: "Error while sending: Unauthenticated request",
        success: false,
      };
    }
    const from = user?.id;

    const toUser = await db.user.findFirst({
      where: { number: to },
    });

    if (!toUser) {
      return { message: "User not found", success: false };
    }

    await db.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }
      await new Promise((r) => setTimeout(r, 4000));
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    revalidatePath("/transfer");
    return { message: "Money sent", success: true };
  } catch (error: any) {
    console.log(error);
    return { message: error.message, success: false };
  }
}
