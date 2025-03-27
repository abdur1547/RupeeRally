"use client";

// import { refreshToken } from "@/lib/actions/auth/refresh";
// import axios from "axios";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import { toast } from "sonner";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // const redirectUser = () => {
  //   toast("Could not refresh your session.", {
  //     description: "please login again",
  //   });
  //   redirect("/login");
  // };
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await refreshToken();

  //       if (!response.success) {
  //         console.error(response.data.message);
  //         redirectUser();
  //       }
  //     } catch (error) {
  //       console.error("Error refreshing token:", error);
  //       redirectUser();
  //     }
  //   }, 40000); // Refresh every 40 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return <>{children}</>;
}
