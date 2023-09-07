import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="block text-3xl font-bold text-indigo-800">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
      Task Management
    </main>
  );
}
