import React from 'react';
import { AuthForm } from '@/components/AuthForm';
import asset1 from '@/public/assets/images/asset1.jpg';
import asset2 from '@/public/assets/images/asset2.jpg';
import Image from 'next/image';

const Login = () => {
  return (
    <section className="flex flex-row min-h-dvh">
      <div className="basis-[50%] flex flex-col justify-center items-center min-h-dvh">
        <header>
          <h1>Login to Rupee Rally</h1>
        </header>
        <AuthForm />
      </div>
      <div className="basis-[50%] bg-accent min-h-dvh flex flex-col justify-center items-center">
        <div className="relative mt-10 mb-20">
          <span className="inline-block w-20 h-20 absolute -top-20 left-5 bg-transparent border-2 border-emerald-800 z-10"></span>
          <span className="inline-block w-20 h-20 absolute -top-24 -left-4 bg-emerald-900"></span>
          <span className="inline-block w-10 h-20 absolute rounded-s-full -bottom-10 -right-5 rotate-45 bg-emerald-900"></span>
          <Image
            src={asset2}
            width={148}
            height={96}
            alt="mock expenses image"
            className="rounded-3xl shadow-md absolute z-20 -top-9 -right-20"
          />
          <Image
            src={asset1}
            width={312}
            height={301}
            alt="mock expenses image"
            className=" relative z-10 rounded-3xl shadow-md"
          />
        </div>
        <div className="max-w-96 mx-auto text-background text-center">
          <h2>Let's Continue Simplifying Your Expenses!</h2>
          <p>Log in to stay in sync with your friends and finances.</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
