"use client";

import { logoutUser } from "@/lib/actions/auth/logout";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { LoaderCircle, LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const LogoutForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <DropdownMenuItem asChild className="w-full">
        <button type="submit">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
          {isLoading && <LoaderCircle className="animate-spin" size={16} />}
        </button>
      </DropdownMenuItem>
      {/* <Button type="submit">Logout</Button> */}
    </form>
  );
};
