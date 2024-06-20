import Logout from "@/lib/components/Logout";
import { validateSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { session, user } = await validateSession();
  if (!session) redirect('/login')

  return (
    <div><p>Hello user {user?.firstName}!</p>
      <Logout />
    </div>
  )
}

