"use client";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

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

  return (
    <button
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-[6px] transition dark:hover:bg-[#454547]",
        id && params.teamId === id && "bg-[#454547]",
      )}
      onClick={onClick}
    >
      <div className=" dark:text-[#a2a0a2]">{icon}</div>
      <span className="truncate text-sm leading-7">{label}</span>
    </button>
  );
};
