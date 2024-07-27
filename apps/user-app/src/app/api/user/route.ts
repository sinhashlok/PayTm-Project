import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET() {
  try {
    const user = await auth();
    if (user) {
      return NextResponse.json({ user: user });
    }

    return NextResponse.json({ message: "User not logged in" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
