import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const NavigationSidebar = async () => {
  return (
    <div className="flex h-full w-60 flex-col items-center space-y-4 bg-[#e3e5e8] py-3 text-primary dark:bg-[#2e2e30]">
      <Separator className="mx-auto h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        <div>Navigation Item</div>
      </ScrollArea>
    </div>
  );
};
