import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Navbar } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/libs/utils";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Telos | Telos CTF platform",
  description: "Telos CTF platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "flex flex-col items-center",
          "py-5",
          fontSans.variable
        )}
      >
        <SessionProvider refetchOnWindowFocus>
          <Navbar />
          <div className="w-full max-w-screen-lg px-5 flex justify-center">
            {children}
          </div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
