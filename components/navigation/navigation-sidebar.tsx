import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationHeader } from "./navigation-header";
import { NavigationTeams } from "./navigation-teams";
import { NavigationPeoples } from "./navigation-members";

export const NavigationSidebar = async () => {
  return (
    <div className="flex h-full w-60 flex-col items-center space-y-4 bg-[#e3e5e8] py-3 text-primary dark:bg-[#2e2e30]">
      <NavigationHeader />
      <Separator className="mx-auto bg-zinc-300 dark:bg-[#454547]" />
      <ScrollArea className="w-full flex-1">
        <NavigationTeams />
        <NavigationPeoples />
      </ScrollArea>
    </div>
  );
};
