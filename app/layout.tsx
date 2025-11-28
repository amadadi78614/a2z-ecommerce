import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "A2Z Mobile & Computer Services",
  description: "E-commerce & repair booking platform for A2Z Mobile & Computer Services"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-brandDark via-black to-brandRed/60">
          <Header />
          <main className="flex-1 py-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
