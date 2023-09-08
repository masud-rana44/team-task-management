"use client";

import { useDataContext } from "@/contexts/data-context";
import { NavigationItem } from "./navigation-item";
import { Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";

export const NavigationTeams = () => {
  const { appData } = useDataContext();
  const router = useRouter();
  const { onOpen } = useModal();
  const { user } = useUser();

  const teams = appData.teams.filter(
    (team) => user && team.members.includes(user.id),
  );

  return (
    <div className="w-full px-3 py-[6px]">
      <h3 className="mb-3 flex w-full gap-2">
        Teams{" "}
        <span className="ml-auto cursor-pointer text-sm dark:text-[#a2a0a2] dark:hover:text-[#ccc]">
          <Plus onClick={() => onOpen("createTeam")} />
        </span>
      </h3>
      <div className="space-y-1">
        {teams.map((team) => (
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
