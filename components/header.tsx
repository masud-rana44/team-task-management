"use client";

import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { MobileToggle } from "./mobile-toggle";

export const Header = () => {
  const { onOpen } = useModal();

  return (
    <div className="marker:text-md flex h-[56px] w-full items-center border-b border-zinc-300  bg-[#e3e5e8] px-3 font-semibold dark:border-[#424244] dark:bg-[#2e2e30]">
      {/* <MobileToggle /> */}
      <Button
        onClick={() => onOpen("createTeam")}
        variant="primary"
        size="md"
        className="space-x-2 text-sm"
      >
        <Plus className="h-5 w-5 rounded-full bg-[#dc4c3e] p-1 text-xs" />
        <span>Create</span>
      </Button>
      <div className="ml-auto flex items-center gap-x-2">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[32px] w-[32px]",
            },
          }}
        />
      </div>
    </div>
  );
};
