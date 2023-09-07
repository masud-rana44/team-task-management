"use client";

import { useRouter } from "next/navigation";
import { Home, CheckCircle, MailPlus } from "lucide-react";

import { NavigationItem } from "./navigation-item";

export const NavigationHeader = () => {
  const router = useRouter();

  return (
    <div className="w-full px-3 py-[6px]">
      <NavigationItem
        onClick={() => router.push("/")}
        icon={<Home className="h-5 w-5" />}
        label="Home"
      />
      <NavigationItem
        onClick={() => router.push("/tasks")}
        icon={<CheckCircle className="h-5 w-5" />}
        label="My tasks"
      />
      <NavigationItem
        onClick={() => router.push("/invitations")}
        icon={<MailPlus className="h-5 w-5" />}
        label="Invitations"
      />
    </div>
  );
};
