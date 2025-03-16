"use client";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { createContext, useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });


export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Navbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
