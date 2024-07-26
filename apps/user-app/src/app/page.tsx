import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();
  if (userId) {
    return redirect("/dashboard");
  }
  return <div></div>;
};

export default page;
