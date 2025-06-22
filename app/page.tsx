"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogIn, LogOut } from "lucide-react";

const features = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="16" fill="#00BCD4" />
        <path
          d="M10 16h12M16 10v12"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Easy Repairs",
    desc: "Find trusted fixers for any repair in your area, instantly.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="16" fill="#00BCD4" />
        <path
          d="M16 10v12M10 16h12"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Verified Experts",
    desc: "All fixers are background-checked and rated by the community.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="16" fill="#00BCD4" />
        <path
          d="M12 20l8-8M12 12h8v8"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Seamless Experience",
    desc: "Book, chat, and pay securely—all in one place.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm z-20">
        <div className="flex items-center gap-2">
          {/* <img src="/logo.svg" alt="Jazaro Logo" className="h-8 w-8" /> */}
          <span className="text-2xl font-bold text-[#00BCD4] tracking-tight">
            Jazaro
          </span>
        </div>
        <div className="flex ">
          <Link href="/auth/signin" passHref>
            <Button
              variant="default"
              className="flex items-center gap-2 bg-[#00BCD4] hover:bg-[#0097A7]"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signup" passHref>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4]/10 ml-2"
            >
              <LogOut className="w-4 h-4" />
              Sign up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="max-w-2xl w-full text-center mt-16 opacity-100 translate-y-0 transition-all duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#006064] mb-4 leading-tight drop-shadow-lg">
            Repair. <span className="text-[#00BCD4]">Reimagine.</span> <br />
            <span className="text-[#00838F]">Jazaro</span> is here.
          </h1>
          <p className="text-lg md:text-2xl text-[#00838F] mb-8 font-medium">
            The fastest way to connect with trusted fixers for anything that
            needs a fix—right in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center transition-all duration-500">
            <Link
              href="/dashboard"
              className="bg-[#00BCD4] hover:bg-[#0097A7] text-white text-lg font-semibold px-4 py-4 shadow-lg transition-all duration-200 rounded flex items-center justify-center"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4]/10 text-lg font-semibold px-4 py-4 shadow rounded flex items-center justify-center border mt-0 sm:mt-0"
            >
              Sign in to continue
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center border border-[#00BCD4]/10 transition-all duration-700 opacity-100 translate-y-0"
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#00BCD4] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#00838F] text-center">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[#00838F] font-medium bg-white/70 mt-24">
        &copy; {new Date().getFullYear()} Jazaro. All rights reserved.
      </footer>
    </div>
  );
}
