"use client";

import { logoutUser } from "@/lib/actions/auth/logout";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const LogoutForm = () => {
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
      <Button type="submit">
        Logout
        {isLoading && <LoaderCircle className="animate-spin" size={20} />}
      </Button>
    </form>
  );
};

export default LogoutForm;
