"use client";

import axios from "axios";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("/api/auth/refresh");
        if (!response.data.success) {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 40000); // Refresh every 40 seconds

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
