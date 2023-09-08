"use client";

import { useDataContext } from "@/contexts/data-context";
import { NavigationItem } from "./navigation-item";
import { Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export const NavigationTeams = () => {
  const { appData } = useDataContext();
  const router = useRouter();

  return (
    <div className="w-full px-3 py-[6px]">
      <h3 className="mb-3 flex w-full gap-2">
        Teams{" "}
        <span className="ml-auto cursor-pointer text-sm dark:text-[#a2a0a2] dark:hover:text-[#ccc]">
          <Plus />
        </span>
      </h3>
      <div className="space-y-1">
        {appData.teams.map((team) => (
          <NavigationItem
            key={team.id}
            icon={<Users className="h-5 w-5" />}
            label={team.name}
            id={team.id}
            onClick={() => router.push(`/teams/${team.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
