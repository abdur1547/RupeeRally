import Image from 'next/image';
import React from 'react';

const Login = () => {
  return (
    <section>
      <div className="flex flex-row">
        <div className="basis-[60%]">
          <header>
            <h1>Login to Rupee Rally</h1>
          </header>
        </div>
        <div className="basis-[40%] bg-accent">
          <div></div>
          <div className="max-w-96 mx-auto text-background text-center">
            <h2>Let's Continue Simplifying Your Expenses!</h2>
            <p>Log in to stay in sync with your friends and finances.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
