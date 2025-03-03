"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

const SidebarTriggerWithTooltip = () => {
  const sidebar = useSidebar();
  const sidebarNextContext = sidebar.state === "collapsed" ? "Expande" : "Collapse";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent>
          <p>{sidebarNextContext} Sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarTriggerWithTooltip;
