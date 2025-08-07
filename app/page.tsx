"use client";

import React from "react";
import { Button, Menu } from "antd";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  LogIn,
  Wrench,
  Users,
  ShieldCheck,
  Star,
  Phone,
} from "lucide-react";

const services = [
  {
    icon: <Wrench className="w-8 h-8 text-cyan-600" />,
    title: "Find a Fixer",
    description:
      "Easily connect with skilled professionals for any repair or service you need, from plumbing to electronics.",
  },
  {
    icon: <Users className="w-8 h-8 text-cyan-700" />,
    title: "Join as a Fixer",
    description:
      "Showcase your skills, get discovered by users, and grow your business by joining our trusted fixer community.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-cyan-800" />,
    title: "Verified & Trusted",
    description:
      "All fixers are background-checked and reviewed, ensuring safety and quality for every user.",
  },
  {
    icon: <Star className="w-8 h-8 text-cyan-400" />,
    title: "Ratings & Reviews",
    description:
      "Read real reviews and ratings from other users to help you choose the best fixer for your needs.",
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-100 flex flex-col">
      {/* Header Navigation */}
      <header className="w-full bg-white/80 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Phone className="w-8 h-8 text-cyan-600" />
            <span className="text-2xl font-bold text-cyan-700 tracking-tight">
              Jazaro
            </span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#services"
              className="text-gray-700 hover:text-cyan-600 font-medium transition"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-cyan-600 font-medium transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-cyan-600 font-medium transition"
            >
              Contact
            </a>
          </nav>
          <div className="flex gap-2">
            <Button
              type="text"
              icon={<LogIn className="w-4 h-4 mr-1 text-cyan-700" />}
              className="font-medium text-cyan-700 hover:text-cyan-900"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
            <Button
              type="primary"
              icon={<UserPlus className="w-4 h-4 mr-1 text-white" />}
              className="bg-cyan-600 hover:bg-cyan-700 font-medium"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-16 gap-12">
        <div className="flex-1 flex flex-col items-start justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Connecting <span className="text-cyan-600">Fixers</span> &amp;{" "}
            <span className="text-cyan-700">Users</span> <br />
            for a Better Service Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            FixerConnect is your one-stop platform to find trusted professionals
            for any job, or to offer your skills as a fixer. Fast, reliable, and
            secure for everyone.
          </p>
          <div className="flex gap-4 mt-2">
            <Button
              type="primary"
              size="large"
              className="bg-cyan-600 hover:bg-cyan-700 font-semibold"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started
            </Button>
            <Button
              size="large"
              className="font-semibold border-cyan-600 text-cyan-700 hover:text-white hover:bg-cyan-600"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/fixer-hero.svg"
            alt="Fixer and User Collaboration"
            className="w-full max-w-md rounded-2xl shadow-lg border border-cyan-100"
            style={{ minHeight: 280 }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="bg-cyan-50 rounded-xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-900 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Phone className="w-6 h-6 text-cyan-300" />
            <span className="font-bold text-lg">Jazaro</span>
          </div>
          <div className="text-sm text-cyan-200">
            &copy; {new Date().getFullYear()} Jazaro. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#services" className="hover:underline text-cyan-200">
              Services
            </a>
            <a href="#about" className="hover:underline text-cyan-200">
              About
            </a>
            <a href="#contact" className="hover:underline text-cyan-200">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
