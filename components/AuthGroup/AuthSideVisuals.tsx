import React from "react";
import loginEllipse from "@/public/assets/login-ellipse.svg";
import loginSquare from "@/public/assets/login-square.svg";
import GoogleLogo from "@/public/assets/google-logo.svg";
import AppleLogo from "@/public/assets/apple-logo.svg";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const socialLogins = [
  { name: "Google", logo: GoogleLogo, alt: "Google logo" },
  { name: "Apple", logo: AppleLogo, alt: "Apple logo" },
];

interface AuthSideVisualsProps {
  children: React.ReactNode;
  frame1: StaticImageData;
  frame2: StaticImageData;
  heading: string;
  headline: string;
  tagline: string;
}

export const AuthSideVisuals = ({
  children,
  frame1,
  frame2,
  headline,
  heading,
  tagline,
}: AuthSideVisualsProps) => {
  return (
    <main className="min-h-dvh flex flex-row">
      <div className="flex-1">
        <section
          className={cn(
            "flex flex-col justify-center bg-background text-foreground h-full w-full max-w-2xl py-4 px-12 mx-auto",
            "sm:px-24 lg:mr-0"
          )}
        >
          <h1 className="text-3xl font-bold text-center mb-6">{heading}</h1>
          <div className="flex flex-col items-center justify-center sm:flex-row gap-3 sm:gap-6 mb-4">
            {socialLogins.map(({ name, logo, alt }) => (
              <Button
                key={name}
                className="flex items-center gap-2 px-3 py-2 w-full bg-muted rounded-md text-sm cursor-pointer hover:bg-muted"
              >
                <Image src={logo} width={16} height={16} className="w-4 h-4" alt={alt} />
                <span>{name}</span>
              </Button>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 mb-8">
            <Separator className="flex-1" />
            <span className="text-sm font-normal">OR</span>
            <Separator className="flex-1" />
          </div>
          {children}
        </section>
      </div>
      <div className="flex-1 hidden lg:block">
        <section className="bg-primary text-white h-full px-24">
          <div className="flex flex-col h-full items-center justify-center max-w-2xl">
            <div className="relative mb-16">
              <Image
                src={frame1}
                alt="expense asset image 1"
                className="relative w-64 h-60 z-10 rounded-2xl object-contain overflow-hidden"
              />
              <Image
                src={frame2}
                alt="expense asset image 2"
                className="absolute w-36 h-20 z-20 -top-16 -right-16 shadow-2xl rounded-2xl object-cover overflow-hidden"
              />
              <Image
                src={loginEllipse}
                alt="expense asset image 3"
                className="absolute w-24 h-20 object-contain z-0 -bottom-10 -right-14 overflow-hidden"
              />
              <Image
                src={loginSquare}
                alt="expense asset image 4"
                className="absolute w-24 h-20 object-contain -top-22 -left-3 overflow-hidden"
              />
            </div>
            <div className="text-center max-w-96">
              <h2 className="text-3xl font-bold mb-2.5">{headline}</h2>
              <h5 className="text-base font-normal">{tagline}</h5>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
