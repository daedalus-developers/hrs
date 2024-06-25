import SignUp from "@components/SignUp";
import { getUser } from "@server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { user } = await getUser()
  if (user) redirect("/home");

  return (
    <div>
      <SignUp />
    </div>
  );
}
