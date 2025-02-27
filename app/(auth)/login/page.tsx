import React from "react";
import loginFrame1 from "@/public/assets/login/login-frame-1.png";
import loginFrame2 from "@/public/assets/login/login-frame-2.png";
import AuthSideVisuals from "@/components/AuthGroup/AuthSideVisuals";

const Login = () => {
  return (
    <AuthSideVisuals
      frame1={loginFrame1}
      frame2={loginFrame2}
      heading="Login to Rupee Rally"
      headline="Let's Continue Simplifying Your Expenses!"
      tagline="Log in to stay in sync with your friends and finances."
    ></AuthSideVisuals>
  );
};

export default Login;
