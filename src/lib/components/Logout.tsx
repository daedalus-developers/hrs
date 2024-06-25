import { logout } from "@actions/logout";

export default function Logout() {
  return (
    <div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
