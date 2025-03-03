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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Budgets",
    url: "/dashboard/budgets",
    icon: CircleDollarSign,
  },
  {
    title: "My Accounts",
    url: "/dashboard/accounts",
    icon: Wallet,
  },
  {
    title: "Records",
    url: "/dashboard/records",
    icon: NotebookPen,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: ChartColumnStacked,
  },
  {
    title: "Friends",
    url: "/dashboard/friends",
    icon: UserRoundPlus,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: Users,
  },
  {
    title: "Activity",
    url: "/dashboard/activity",
    icon: ChartNoAxesCombined,
  },
];

export function AppSidebar() {
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
                  <SidebarMenuButton asChild className="py-5">
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
