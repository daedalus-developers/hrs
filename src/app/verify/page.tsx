import Logout from "@components/Logout";
import ResendVerification from "@components/ResendVerification";
import VerificationForm from "@components/VerificationForm";
import { getUser } from "@server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { user } = await getUser();
  if (!user) redirect('/login')
  if (user.emailVerified) redirect('/home')
  return (
    <div>
      <VerificationForm userId={user!.id} />
      <ResendVerification userId={user!.id} email={user!.email} />
      <Logout />
    </div>
  );
}
