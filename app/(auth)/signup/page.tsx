import React from "react";
import signupFrame1 from "@/public/assets/signup/signup-frame-1.png";
import signupFrame2 from "@/public/assets/signup/signup-frame-2.png";
import AuthSideVisuals from "@/components/AuthGroup/AuthSideVisuals";

const Signup = () => {
  return (
    <AuthSideVisuals
      frame1={signupFrame1}
      frame2={signupFrame2}
      heading="Sign Up to Rupee Rally"
      headline="Join our community of smarter savers and stress-free spenders."
      tagline="Split Bills, Share Joys, Save More!"
    >
      <div></div>
    </AuthSideVisuals>
  );
};

export default Signup;
