"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const NavigationItem = ({
  label,
  icon,
  onClick,
}: NavigationItemProps) => {
  return (
    <button
      className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-[6px] transition dark:hover:bg-[#454547]"
      onClick={onClick}
    >
      <div className=" dark:text-[#a2a0a2]">{icon}</div>
      <span className="truncate text-sm leading-7">{label}</span>
    </button>
  );
};
