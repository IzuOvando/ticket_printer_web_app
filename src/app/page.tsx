import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    return redirect("/login");
  }

  return (
    <main>
      <h1>Here implement the tables and main app</h1>
    </main>
  );
}
