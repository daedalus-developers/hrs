import Logout from "@components/Logout";
import VerificationForm from "@components/VerificationForm";
import { validateSession } from "@server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { session, user } = await validateSession();
  if (!session) redirect("/login");
  if (user!.emailVerified) redirect("/home");

  return (
    <div>
      <VerificationForm userId={user!.id} email={user!.email} />
      <Logout />
    </div>
  );
}
