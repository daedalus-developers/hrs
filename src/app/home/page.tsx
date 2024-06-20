import Logout from "@components/Logout";
import { validateSession } from "@server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { session, user } = await validateSession();
  if (!session) redirect("/login");
  if (!user?.emailVerified) redirect("/verify");

  return (
    <div>
      <p>Hello, {user!.firstName}!</p>
      <Logout />
    </div>
  );
}
