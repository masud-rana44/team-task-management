"use client";

import { MoreVertical, Trash, Edit } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/contexts/data-context";

interface MembersMenuProps {
  id: string | string[];
}

export const MembersMenu = (id: MembersMenuProps) => {
  const { appData, setAppData } = useDataContext();

  // @ts-ignore
  const team = appData.teams.find((team) => team.id === id);

  if (!team) return null;

  const members = appData.users.filter((user) =>
    team.members.includes(user.id),
  );

  console.log(members);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <button className="text-md flex w-full items-center rounded-lg border-neutral-200 p-2 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          <MoreVertical className="ml-auto h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {members.map((member) => (
          <div key={member.id}>{member.username}</div>
        ))}
        <DropdownMenuItem
          onClick={() => {}}
          className="cursor-pointer px-3 py-2 text-xs text-indigo-600 dark:text-indigo-400"
        >
          Edit <Edit className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
          className="cursor-pointer px-3 py-2 text-xs text-indigo-600 dark:text-indigo-400"
        >
          Delete <Trash className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
