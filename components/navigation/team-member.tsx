"use client";

import { useParams, useRouter } from "next/navigation";

import { UserAvatar } from "@/components/user-avater";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export const TeamMember = ({ member }: any) => {
  const params = useParams();
  const { user } = useUser();

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-[#454547]",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700",
      )}
    >
      <UserAvatar
        src={member.profilePicture}
        classname="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {member.username}
      </p>
      {user?.id === member.id && (
        <p className="ml-1 text-sm text-zinc-500">you</p>
      )}
    </button>
  );
};
