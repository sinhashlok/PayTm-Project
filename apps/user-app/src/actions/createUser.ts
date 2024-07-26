"use server";
import { db } from "../lib/db";

interface UserProps {
  id: string;
  name: string | undefined;
  email: string | undefined;
  number: string | undefined;
}

export const createUser = async (user: UserProps) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (existingUser) {
      return;
    }

    await db.user.create({
      data: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        number: user?.number,
      },
    });

    return;
  } catch (error) {
    console.log(error);
    return { error: "Db failed" };
  }
};
