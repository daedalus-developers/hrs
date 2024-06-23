import Logout from "@components/Logout";
import { getUser } from "@server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { user } = await getUser()
  if (!user) redirect("/login");
  if (!user.emailVerified) redirect("/verify");

  return (
    <div>
      <p>Hello {user.firstName}!</p>
      <Logout />
    </div>
  );
}
