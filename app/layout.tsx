import "./globals.scss";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { faviconIcons } from "@/constants";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const title = "RupeeRally - Simplify Personal & Shared Finance Management";
const description = "Take control of your finances with RupeeRally - the smart way to track, manage, and optimize both personal and shared expenses. Effortless budgeting, expense tracking, and financial planning for individuals and groups.";

export const metadata: Metadata = {
  title,
  description,
  icons: faviconIcons,
  keywords: "personal finance, expense tracker, budget planner, shared expenses, money management, financial planning, bill splitting, savings tracker, debt management, household budget, group expenses, financial goals, expense sharing, budget app, finance manager, rupee tracker, Indian finance app, financial dashboard",
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/site.webmanifest" />
      <body className={`${figtree.variable} antialiased`}>{children}</body>
    </html>
  );
}
