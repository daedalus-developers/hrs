import { api } from "@/lib/client";
import Counter from "@/lib/components/counter";
import ServerStatus from "@/lib/components/server-status";

export default async function Home() {
  let status = "Not Connected";
  const healtcheck = await api.healthceck.$get();

  if (healtcheck.ok) {
    status = await healtcheck.text();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ServerStatus
          serverStatus={status}
          pageLoadTime={new Date().toISOString()}
        />
      </div>
      <div>
        <Counter />
      </div>
    </main>
  );
}
