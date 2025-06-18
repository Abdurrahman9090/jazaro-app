import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { MapPin, MessageCircle, Search, User, Camera } from "lucide-react";

const TabMenu = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-[10px] border-t border-[#00BCD4]/20 px-4 py-2 shadow-[0_4px_10px_rgba(0,188,212,0.3)] z-40">
      <div className="flex justify-around">
        <Link
          href="/"
          className="flex flex-col items-center py-2 text-[#006064] transform hover:scale-110 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4]/20 to-[#26C6DA]/20 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-lg">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/messages"
          className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Button
          onClick={() => {}}
          className="flex flex-col items-center py-2 bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] hover:from-[#00ACC1] hover:to-[#00BCD4] rounded-[20px] w-14 h-14 -mt-2 shadow-[0_0_20px_rgba(0,188,212,0.5)] transform hover:scale-110 transition-all duration-300 border-2 border-white/30 active:scale-95"
        >
          <Camera className="h-6 w-6 text-white" />
          <span className="text-xs text-white mt-1 font-bold">AI</span>
        </Button>
        <Link
          href="/history"
          className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
            <Search className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">History</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
            <User className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default TabMenu;
