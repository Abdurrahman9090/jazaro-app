"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

// Add a global style to enforce min-width: 425px on the body or root container
// This can be done via a style tag or inline style on the outermost div

const features = [
  {
    icon: ( <></>
      // <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      //   <rect width="32" height="32" rx="16" fill="#00BCD4" />
      //   <path
      //     d="M10 16h12M16 10v12 "
      //     stroke="#fff"
      //     strokeWidth="2"
      //     strokeLinecap="round"
      //   />
      // </svg>
    ),
    title: "Easy Repairs",
    desc: "Find trusted fixers for any repair in your area, instantly.",
  },
  {
    icon: ( <></>
      // <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      //   <rect width="32" height="32" rx="16" fill="#00BCD4" />
      //   <path
      //     d="M10 16h12M16 10v12 "
      //     stroke="#fff"
      //     strokeWidth="2"
      //     strokeLinecap="round"
      //   />
      // </svg>
    ),
    title: "Verified Experts",
    desc: "All fixers are background-checked and rated by the community.",
  },
  {
    icon: ( <></>
      // <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      //   <rect width="32" height="32" rx="16" fill="#00BCD4" />
      //   <path
      //     d="M10 16h12M16 10v12 "
      //     stroke="#fff"
      //     strokeWidth="2"
      //     strokeLinecap="round"
      //   />
      // </svg>
    ),
    title: "Seamless Experience",
    desc: "Book, chat, and pay securely—all in one place.",
  },
];

function OnboardingCarousel() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen h-auto flex items-center justify-center py-0">
      <div className="w-full max-w-md mx-auto relative overflow-hidden rounded-2xl border border-[#00BCD4] flex flex-col items-center min-h-[95vh] bg-white/70 backdrop-blur-xl p-0 sm:p-0">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center justify-center mt-14 mb-8">
          <div className="flex items-center gap-2">
            <div className="relative">
              {/* 3D Cube Effect - Increased size */}
              <div className="w-16 h-16 relative transform-gpu perspective-1000">
                <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-lg shadow-lg transform rotate-12 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-lg opacity-80 transform translate-x-2 translate-y-2"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-3xl transform -rotate-12 drop-shadow-lg">
                      J
                    </span>
                  </div>
                </div>
              </div>
              {/* Glowing Core - Increased size and centered */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_20px_rgba(0,188,212,0.8)] animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#006064] drop-shadow-lg mt-3">
            Jazaro
          </h1>
        </div>
        <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
          {step < 3 ? (
            <section className="max-w-md w-full text-center mt-2 opacity-100 translate-y-0 transition-all duration-700 flex flex-col items-center">
              <div className="mb-6">{features[step].icon}</div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#006064] mb-4 leading-tight drop-shadow-lg">
                {features[step].title}
              </h1>
              <p className="text-lg md:text-xl text-[#00838F] mb-8 font-medium">
                {features[step].desc}
              </p>
              <div className="flex gap-2 justify-center mt-8">
                {step > 0 && (
                  <Button
                    variant="outline"
                    className="border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4]/10 px-6"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="default"
                  className="bg-[#00BCD4] hover:bg-[#0097A7] text-white px-6"
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next
                </Button>
              </div>
              {/* Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      step === idx
                        ? "bg-[#00BCD4]"
                        : "bg-[#B2EBF2] border border-[#00BCD4]/30"
                    }`}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="max-w-md w-full text-center mt-2 opacity-100 translate-y-0 transition-all duration-700 flex flex-col items-center">
              <h1 className="text-3xl md:text-2xl font-extrabold text-[#006064] mb-4 leading-tight drop-shadow-lg">
                Repair. <span className="text-[#00BCD4]">Reimagine.</span> <br />
                <span className="text-[#00838F]">Jazaro</span> is here.
              </h1>
              <p className="text-lg md:text-l text-[#00838F] mb-8 font-medium">
                The fastest way to connect with trusted fixers for anything that needs a fix—right in your neighborhood.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center transition-all duration-500">
                <Link href="/auth/signin" className="bg-[#00BCD4] hover:bg-[#0097A7] text-white text-lg font-semibold px-4 py-4 shadow-lg transition-all duration-200 rounded flex items-center justify-center">
                  <LogIn className="w-4 h-4" />
                  Sign in
                </Link>
                <Link href="/auth/signup" className="border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4]/10 text-lg font-semibold px-4 py-4 shadow rounded flex items-center justify-center border mt-0 sm:mt-0">
                  <LogOut className="w-4 h-4" />
                  Sign up
                </Link>
              </div>
              <div className="flex gap-2 justify-center mt-8">
                <Button
                  variant="outline"
                  className="border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4]/10 px-6"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </div>
              {/* Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {[0, 1, 2, 3].map((idx) => (
                  <span
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      step === idx
                        ? "bg-[#00BCD4]"
                        : "bg-[#B2EBF2] border border-[#00BCD4]/30"
                    }`}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return <OnboardingCarousel />;
}
