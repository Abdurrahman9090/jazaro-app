"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { signin } from "@/redux/actions/authActions";
import { ILoginFormData } from "@/types/reduxTypes/auth";

// Simple email and password validation
const validateInput = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};

export default function Signin() {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateInput(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    const data = { email, password } as ILoginFormData;
    // The thunk returns a promise, but we need to check the result
    const resultAction = await dispatch(signin(data));
    setLoading(false);

    // If you want to handle navigation or show a message, do it here
    // For now, just log success/failure
    if ((resultAction as any).payload === true) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-[0_8px_32px_rgba(0,188,212,0.3)] rounded-[20px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[#006064] hover:text-[#00838F] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="w-5" /> {/* Spacer for alignment */}
          </div>
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
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#006064]">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 bg-white/80 backdrop-blur-[10px] border ${
                    errors.email ? "border-red-500" : "border-[#00BCD4]/30"
                  } text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]`}
                  required
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#006064]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 bg-white/80 backdrop-blur-[10px] border ${
                    errors.password ? "border-red-500" : "border-[#00BCD4]/30"
                  } text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]`}
                  required
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00838F] hover:text-[#00BCD4] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1" id="password-error">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-[#00BCD4]/30 text-[#00BCD4] focus:ring-[#00BCD4]/20"
                  // You can handle remember me logic here if needed
                />
                <Label htmlFor="remember" className="text-sm text-[#00838F]">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#00838F] hover:text-[#00BCD4] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px]"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-center text-sm text-[#00838F]">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
