"use client";

import {
  Wallet,
  Home,
  CircleDollarSign,
  NotebookPen,
  ChartColumnStacked,
  UserRoundPlus,
  Users,
  ChartNoAxesCombined,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: CircleDollarSign,
  },
  {
    title: "My Accounts",
    url: "/accounts",
    icon: Wallet,
  },
  {
    title: "Records",
    url: "/records",
    icon: NotebookPen,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: ChartColumnStacked,
  },
  {
    title: "Friends",
    url: "/friends",
    icon: UserRoundPlus,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Activity",
    url: "/activity",
    icon: ChartNoAxesCombined,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl mb-6 mt-3 text-black">
            Rupee Rally
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="py-5"
                    isActive={pathname.includes(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
