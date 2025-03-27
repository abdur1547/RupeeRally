"use client";

import React, { useState, MouseEventHandler } from "react";
import { toast } from "sonner";
import { LoaderCircle, LogOutIcon } from "lucide-react";
import { logoutUser } from "@/lib/actions/auth/logout";
import { redirect } from "next/navigation";
import { IconSwapButton } from "../IconSwapButton";

interface LogoutFormProps {
  size?: "sm" | "default";
}

const LogoutForm = ({ size = "default" }: LogoutFormProps) => {
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
    <IconSwapButton Icon={LogOutIcon} size={size} onClick={handleSubmit}>
      Logout
      {isLoading && <LoaderCircle className="animate-spin" size={16} />}
    </IconSwapButton>
  );
};

LogoutForm.displayName = "LogoutForm"; // Set displayName for better debugging

export { LogoutForm };
