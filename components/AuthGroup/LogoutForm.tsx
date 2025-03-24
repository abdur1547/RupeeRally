"use client";

import { logoutUser } from "@/lib/actions/auth/logout";
import React, { useState, MouseEventHandler } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { LoaderCircle, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: "default" | "lg";
}

const LogoutForm = React.forwardRef<HTMLButtonElement, LogoutFormProps>(
  ({ iconSize = "default", className, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
      setIsLoading(true);
      const response = await logoutUser();

      if (response.success) {
        toast("Logged out successfully!");
        redirect("/login");
      } else {
        toast("Logout failed");
      }
      setIsLoading(false);
    };

    return (
      <button
        type="button"
        className={`group w-full ${className}`}
        onClick={handleSubmit}
        ref={ref}
        {...props}
      >
        <LogOutIcon
          size={iconSize === "default" ? 16 : 24}
          aria-hidden="true"
          className={cn({
            "size-9 p-1.5 bg-muted rounded-md group-hover:bg-transparent": iconSize === "lg",
          })}
        />
        Logout
        {isLoading && <LoaderCircle className="animate-spin" size={16} />}
      </button>
    );
  }
);

LogoutForm.displayName = "LogoutForm"; // Set displayName for better debugging

export { LogoutForm };
