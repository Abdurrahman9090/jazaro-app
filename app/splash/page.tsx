"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SplashPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-5 w-32 h-32 bg-gradient-to-r from-[#26C6DA] to-[#4DD0E1] rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-5 w-36 h-36 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full opacity-30 blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* 3D Cube with Glowing Core */}
      <div className="relative z-10 mb-12">
        <div className="relative w-32 h-32 transform-gpu perspective-1000">
          {/* Main Cube */}
          <div className="absolute inset-0 transform rotate-12 animate-spin-slow">
            <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-2xl shadow-[0_0_40px_rgba(0,188,212,0.6)] transform rotate-y-12 rotate-x-12">
              {/* Cube Faces */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-2xl opacity-80 transform translate-x-2 translate-y-2 -translate-z-2"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] rounded-2xl opacity-60 transform translate-x-4 translate-y-4 -translate-z-4"></div>
            </div>
          </div>

          {/* Glowing Core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_30px_rgba(0,188,212,1)] animate-pulse z-10"></div>

          {/* Wireframe Effect */}
          <div className="absolute inset-0 border-2 border-white/50 rounded-2xl transform rotate-12 animate-pulse"></div>
          <div className="absolute inset-2 border border-white/30 rounded-xl transform rotate-6"></div>
        </div>

        {/* Floating Shadow */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-[#00BCD4]/30 rounded-full blur-lg"></div>
      </div>

      {/* Logo and Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-[#006064] mb-2 drop-shadow-lg">Jazaro</h1>
        <p className="text-lg text-[#00838F] mb-1">AI-Powered Repair Network</p>
        <p className="text-sm text-[#00838F]">Connect. Fix. Thrive.</p>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="relative z-10 mb-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[#26C6DA] to-[#4DD0E1] rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-sm text-[#00838F] mt-4">Initializing AI Systems...</p>
        </div>
      )}

      {/* Get Started Button */}
      {!isLoading && (
        <div className="relative z-10 w-full px-8">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] text-white font-bold text-lg py-6 rounded-[20px] shadow-[0_0_30px_rgba(0,188,212,0.5)] hover:from-[#00ACC1] hover:to-[#00BCD4] hover:shadow-[0_0_40px_rgba(0,188,212,0.7)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/30"
          >
            <Link href="/">GET STARTED</Link>
          </Button>
          <p className="text-xs text-[#00838F] text-center mt-4">Join thousands of users already fixing with AI</p>
        </div>
      )}

      {/* Version Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-[#00838F]">
        v2.0.1 • Powered by Advanced AI
      </div>
    </div>
  )
}
