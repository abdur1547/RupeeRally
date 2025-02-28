"use client";

import React, { useState } from "react";
import IconInput from "./IconInput";
import InputPassword from "./InputPassword";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>();

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;

  const onSubmit = async () => {
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      // API Call
    }
  };

  return (
    <div className="space-y-4">
      <form className="space-y-5">
        <div>
          <IconInput
            Icon={Mail}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {emailError && <p className="text-destructive">{emailError}</p>}
        </div>
        <div>
          <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <p className="text-destructive">{passwordError}</p>}
        </div>
        <div className="flex flex-col space-y-7">
          <Button variant="link" type="button" className="ml-auto">
            Forget Password?
          </Button>
          <Button onClick={onSubmit}>Login</Button>
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
