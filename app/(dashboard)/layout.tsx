import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AuthProvider from "@/providers/AuthProvider";
import Header from "@/components/Header/Header";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="bg-muted w-full">
          <Header />
          <main className="p-8">{children}</main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
