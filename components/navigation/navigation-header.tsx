import React from "react";
import { NavigationItem } from "./navigation-item";

import { Home, CheckCircle, MailPlus } from "lucide-react";

export const NavigationHeader = () => {
  return (
    <div className="w-full px-3 py-[6px]">
      <NavigationItem icon={<Home className="h-5 w-5" />} label="Home" />
      <NavigationItem
        icon={<CheckCircle className="h-5 w-5" />}
        label="My tasks"
      />
      <NavigationItem
        icon={<MailPlus className="h-5 w-5" />}
        label="Invitations"
      />
    </div>
  );
};
