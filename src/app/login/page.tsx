import Login from "@components/Login";
import { getUser } from "@server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { user } = await getUser()
  if (user) redirect("/home");

  return (
    <div>
      <Login />
    </div>
  );
}
