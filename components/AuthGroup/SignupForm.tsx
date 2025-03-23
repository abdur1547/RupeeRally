"use client";

import React, { FormEvent, useState } from "react";
import IconInput from "./IconInput";
import InputPasswordSignup from "./InputPasswordSignup";
import { Button } from "../ui/button";
import Link from "next/link";
import { User, Mail, LoaderCircle } from "lucide-react";
import AvatarUploader from "./AvatarUploader";
import { signupUser } from "@/lib/actions/auth/signup";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [image, setImage] = useState<string | null>(null);

  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>();

  const [password, setPassword] = useState<string>("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;

    if (!fullName) {
      setFullNameError("Please enter your full name.");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      valid = false;
    }

    if (valid) {
      setIsLoading(true);
      const response = await signupUser({
        fullname: fullName,
        email: email,
        password: password,
      });

      console.log("res:", response);

      if (response.success) {
        toast(response.message);
        redirect("/dashboard");
      } else {
        toast(response.message, {
          description: response.errors[0],
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <AvatarUploader onImageSelect={() => {}} />
        </div>
        <div>
          <IconInput
            Icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            type="text"
          />
          {fullNameError && <p className="text-destructive">{fullNameError}</p>}
        </div>
        <div>
          <IconInput
            Icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
          />
          {emailError && <p className="text-destructive">{emailError}</p>}
        </div>
        <div>
          <InputPasswordSignup getPassword={setPassword} />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          Sign up
          {isLoading && <LoaderCircle className="animate-spin" size={20} />}
        </Button>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <Button variant="link" className="!text-lg">
          <Link href="/login">Login</Link>
        </Button>
      </p>
    </div>
  );
};

export default SignupForm;
