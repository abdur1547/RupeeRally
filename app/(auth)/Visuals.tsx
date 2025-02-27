import React from "react";
import loginEllipse from "@/public/assets/login-ellipse.svg";
import loginSquare from "@/public/assets/login-square.svg";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface VisualsProps {
  frame1: StaticImageData;
  frame2: StaticImageData;
  heading: string;
  headline: string;
  tagline: string;
}

const Visuals = ({ frame1, frame2, headline, heading, tagline }: VisualsProps) => {
  return (
    <main className="min-h-dvh flex flex-row">
      <div className="flex-1">
        <section className="flex flex-col justify-center bg-white h-full w-full max-w-3xl ml-auto p-login-container">
          <h1 className="is-typography--t1 text-center mb-8">{heading}</h1>
          <div className="flex flex-row gap-6 mx-auto">
            <Button>Google</Button>
            <Button>Apple</Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 my-4">
            <Separator className="felx-1" />
            <span>OR</span>
            <Separator className="felx-1" />
          </div>
        </section>
      </div>
      <div className="flex-1">
        <section className="bg-green-500 h-full p-login-container">
          <div className="flex flex-col h-full items-center justify-center max-w-2xl">
            <div className="relative mb-28 mr-auto">
              <Image
                src={frame1}
                alt="expense asset image 1"
                width={390}
                height={377}
                className="relative z-10 object-cover"
              />
              <Image
                src={frame2}
                alt="expense asset image 2"
                width={185}
                height={119}
                className="absolute z-20 -top-16 -right-24 shadow-2xl rounded-2xl object-cover overflow-hidden"
              />
              <Image
                src={loginEllipse}
                alt="expense asset image 3"
                className="absolute z-0 -bottom-16 -right-20 overflow-hidden"
              />
              <Image
                src={loginSquare}
                alt="expense asset image 4"
                className="absolute -top-28 -left-3 overflow-hidden"
              />
            </div>
            <div className="text-center max-w-96">
              <h2 className="is-typography--t3 mb-2.5">{headline}</h2>
              <h5 className="is-typography--t5">{tagline}</h5>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Visuals;
