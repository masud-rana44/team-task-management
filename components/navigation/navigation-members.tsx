"use client";

import { useDataContext } from "@/contexts/data-context";
import { useParams } from "next/navigation";
import React from "react";
import { TeamMember } from "./team-member";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationPeoples = () => {
  const params = useParams();
  const { appData, setAppData } = useDataContext();
  const { onOpen } = useModal();

  if (!params.teamId) return null;

  const team = appData.teams.find((team) => team.id === params.teamId);
  const members = appData.users.filter(
    (user) => team?.members.includes(user.id),
  );

  return (
    <div className="mt-2 w-full px-3 py-[6px]">
      <h3 className="mb-3 flex w-full gap-2">
        Peoples
        <span className="ml-auto cursor-pointer text-sm dark:text-[#a2a0a2] dark:hover:text-[#ccc]">
          <Plus onClick={() => onOpen("members")} />
        </span>
      </h3>
      <div>
        {members.map((member) => (
          <TeamMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
