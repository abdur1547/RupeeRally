import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AuthProvider from "@/providers/AuthProvider";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-muted w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
