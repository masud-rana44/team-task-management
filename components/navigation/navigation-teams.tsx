import { NavigationItem } from "./navigation-item";
import { Plus, Users } from "lucide-react";

export const NavigationTeams = () => {
  return (
    <div className="w-full px-3 py-[6px]">
      <h3 className="mb-3 flex w-full gap-2">
        Teams{" "}
        <span className="ml-auto cursor-pointer text-sm dark:text-[#a2a0a2] dark:hover:text-[#ccc]">
          <Plus />
        </span>
      </h3>
      <NavigationItem
        icon={<Users className="h-5 w-5" />}
        label="Masud's first team"
      />
      <NavigationItem
        icon={<Users className="h-5 w-5" />}
        label="Masud's second team"
      />
    </div>
  );
};
