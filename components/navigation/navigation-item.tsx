"use client";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

interface NavigationItemProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  id?: string;
}

export const NavigationItem = ({
  label,
  icon,
  onClick,
  id,
}: NavigationItemProps) => {
  const params = useParams();
  const pathName = usePathname();
  const path = pathName.split("/")[1];

  return (
    <button
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-[6px] transition hover:bg-zinc-300 dark:hover:bg-[#454547]",
        id && params.teamId === id && "bg-zinc-300 dark:bg-[#454547]",
        path &&
          label.toLocaleLowerCase().includes(path) &&
          "bg-zinc-300 dark:bg-[#454547]",
      )}
      onClick={onClick}
    >
      <div className=" dark:text-[#a2a0a2]">{icon}</div>
      <span className="truncate text-sm leading-7">{label}</span>
    </button>
  );
};
