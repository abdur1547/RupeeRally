"use client";

import React, { useState } from "react";
import IconInput from "./IconInput";
import InputPasswordSignup from "./InputPasswordSignup";
import { Button } from "../ui/button";
import Link from "next/link";
import { User, Mail } from "lucide-react";
import AvatarUploader from "./AvatarUploader";

const SignupForm = () => {
  const [image, setImage] = useState<string | null>(null);

  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>();

  const [password, setPassword] = useState<string>("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const handleImageSelect = (file: File | null) => {
  //   if (file) {
  //     const objectUrl = URL.createObjectURL(file);
  //     setImage(objectUrl);

  //     // Cleanup the URL when component unmounts or new image is selected
  //     return () => URL.revokeObjectURL(objectUrl);
  //   } else {
  //     setImage(null);
  //   }
  // };

  const onSubmit = async () => {
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

    console.log(fullName);
    console.log(email);
    console.log(password);
    if (valid) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="space-y-4">
      <form action={onSubmit} className="space-y-5">
        <div>
          <AvatarUploader image={image} onImageSelect={setImage} />
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
        <Button className="w-full">Sign up</Button>
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
