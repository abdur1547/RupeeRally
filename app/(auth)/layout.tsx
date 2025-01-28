import React from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="min-h-dvh">{children}</main>;
};

export default AuthLayout;
