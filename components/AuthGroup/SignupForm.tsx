import React from "react";
import IconInput from "./IconInput";
import InputPasswordSigup from "./InputPasswordSigup";
import { Button } from "../ui/button";
import Link from "next/link";
import { User, Mail } from "lucide-react";

const SignupForm = () => {
  return (
    <div className="space-y-5">
      <form action="" className="space-y-5">
        <IconInput Icon={User} placeholder="Full Name" type="text" />
        <IconInput Icon={Mail} placeholder="Email Address" type="email" />
        <InputPasswordSigup />
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
