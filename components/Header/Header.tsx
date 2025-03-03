"use client";

import React from "react";
import SidebarTriggerWithTooltip from "./SidebarTriggerWithTooltip";

const Header = () => {
  return (
    <header>
      <div className="p-4 bg-muted text-muted-foreground border-b border-neutral-400">
        <div className="flex items-center gap-2">
          <SidebarTriggerWithTooltip />

          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
