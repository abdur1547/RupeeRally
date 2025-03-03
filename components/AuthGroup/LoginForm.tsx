"use client";

import React, { FormEvent, useState } from "react";
import IconInput from "./IconInput";
import InputPassword from "./InputPassword";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mail, LoaderCircle } from "lucide-react";
import { loginUser } from "@/lib/actions/auth/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    let valid = true;

    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password || !passwordRegex.test(password as string)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (valid) {
      setIsLoading(true);
      const response = await loginUser(email, password);

      if (response.success) {
        toast("Success", {
          description: response.message,
        });
        redirect("/dashboard");
      } else {
        toast("Error", {
          description: response.message,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <IconInput Icon={Mail} placeholder="Email Address" type="email" name="email" />
          {emailError && <p className="text-destructive">{emailError}</p>}
        </div>
        <div>
          <InputPassword name="password" />
          {passwordError && <p className="text-destructive">{passwordError}</p>}
        </div>
        <div className="flex flex-col space-y-7">
          <Button variant="link" type="button" className="ml-auto">
            Forget Password?
          </Button>
          <Button type="submit" disabled={isLoading}>
            Login
            {isLoading && <LoaderCircle className="animate-spin" size={20} />}
          </Button>
        </div>
      </form>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Button variant="link" className="!text-lg">
          <Link href="/signup">Sign up</Link>
        </Button>
      </p>
    </div>
  );
};

export default LoginForm;
