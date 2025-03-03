import React from "react";
import SidebarTriggerWithTooltip from "./SidebarTriggerWithTooltip";
import LogoutForm from "../AuthGroup/LogoutForm";

const Header = () => {
  return (
    <header>
      <div className="p-4 bg-muted text-muted-foreground flex items-center justify-between border-b border-neutral-400">
        <div className="flex items-center gap-2">
          <SidebarTriggerWithTooltip />

          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <LogoutForm />
      </div>
    </header>
  );
};

export default Header;
