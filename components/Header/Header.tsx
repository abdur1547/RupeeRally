import React from "react";
import SidebarTriggerWithTooltip from "./SidebarTriggerWithTooltip";
import { ProfileDropdown } from "../ProfileDropdown";

const Header = () => {
  return (
    <header>
      <div className="pl-4 pr-12 py-4 bg-muted text-muted-foreground flex items-center justify-between border-b border-neutral-400">
        <div className="flex items-center gap-2">
          <SidebarTriggerWithTooltip />

          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
