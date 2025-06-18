"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { email, password })
  }

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
            <Link href="/" className="text-[#006064] hover:text-[#00838F] transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <CardTitle className="text-2xl font-bold text-[#00838F]">Welcome Back</CardTitle>
            <div className="w-5" /> {/* Spacer for alignment */}
          </div>
          <CardDescription className="text-[#00838F]/80">
            Sign in to your Jazaro account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <Image
                src="/jazaro-logo.png"
                alt="Jazaro Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#006064]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#006064]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00838F] hover:text-[#00BCD4] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-[#00BCD4]/30 text-[#00BCD4] focus:ring-[#00BCD4]/20"
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
            >
              Sign In
            </Button>
            <div className="text-center text-sm text-[#00838F]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 