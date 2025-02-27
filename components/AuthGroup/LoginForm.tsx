import React from "react";
import IconInput from "./IconInput";
import InputPassword from "./InputPassword";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="space-y-5">
      <form action="" className="space-y-5">
        <IconInput />
        <InputPassword />
        <div className="flex flex-col space-y-5">
          <Button variant="link" className="ml-auto">
            Forget Password?
          </Button>
          <Button>Login</Button>
        </div>
      </form>
      <p className="text-center">
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
