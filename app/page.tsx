"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button,Input } from "antd";
import {
  ChevronRight,
  Smartphone,
  Users,
  Calendar,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface OnboardingSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    icon: <Smartphone className="w-16 h-16 text-white" />,
    title: "Welcome to Jazaro",
    description:
      "Your ultimate companion for discovering and managing events. Connect with people who share your interests.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <Calendar className="w-16 h-16 text-white" />,
    title: "Discover Amazing Events",
    description:
      "Find concerts, workshops, meetups, and more happening around you. Never miss out on what matters to you.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Users className="w-16 h-16 text-white" />,
    title: "Connect & Network",
    description:
      "Meet like-minded people, build your network, and create lasting connections through shared experiences.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Zap className="w-16 h-16 text-white" />,
    title: "Get Started Today",
    description:
      "Join thousands of users who are already discovering amazing events and building meaningful connections.",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || showSignIn) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === onboardingSlides.length - 1) {
          // After last slide, show sign in
          setTimeout(() => setShowSignIn(true), 1000);
          setIsAutoPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000); // 3 seconds per slide

    return () => clearInterval(timer);
  }, [currentSlide, isAutoPlaying, showSignIn]);

  const handleSkip = () => {
    setIsAutoPlaying(false);
    router.push("/auth/signin");
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${onboardingSlides[currentSlide].gradient} transition-all duration-1000 ease-in-out`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Skip Button */}
        <div className="flex justify-end p-6">
          <Button
            onClick={handleSkip}
            className="text-black hover:text-white hover:bg-white/10"
          >
            Skip
          </Button>
        </div>

        {/* Slides Container */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-sm mx-auto">
            {/* Icon */}
            <div
              className="flex justify-center animate-in zoom-in-50 duration-700"
              key={`icon-${currentSlide}`}
            >
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                {onboardingSlides[currentSlide].icon}
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-3xl font-bold text-white animate-in slide-in-from-bottom-4 duration-700"
              key={`title-${currentSlide}`}
            >
              {onboardingSlides[currentSlide].title}
            </h1>

            {/* Description */}
            <p
              className="text-lg text-white/90 leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-150"
              key={`desc-${currentSlide}`}
            >
              {onboardingSlides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="pb-12">
          <div className="flex justify-center space-x-2 mb-8">
            {onboardingSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Get Started Button */}
          <div className="px-6">
            <Button
              onClick={handleSkip}
              className="w-full h-14 bg-white text-gray-900 hover:bg-white/90 font-semibold text-lg rounded-xl"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

              </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-8 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full blur-md animate-pulse delay-500" />
    </div>
  );
}
