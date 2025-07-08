import React from "react";
import Link from "next/link";

import { Menu, Bell } from "lucide-react";

// antd imports
import { Button } from "antd";
import NavProfile from "@/components/navProfile";

const Header = ({ onMenuClick = () => {} }) => {
  return (
    <header className="sticky max-w-md mx-auto z-50 bg-white/70 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            onClick={onMenuClick}
            className="focus:outline-none p-0 border-0 shadow-none"
            aria-label="Open menu"
            icon={
              <Menu className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            }
          />
          {/* 3D Jazaro Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              {/* 3D Cube Effect */}
              <div className="w-8 h-8 relative transform-gpu perspective-1000">
                <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-lg shadow-lg transform rotate-12 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-lg opacity-80 transform translate-x-1 translate-y-1"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm transform -rotate-12 drop-shadow-lg">
                      J
                    </span>
                  </div>
                </div>
              </div>
              {/* Glowing Core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_10px_rgba(0,188,212,0.8)] animate-pulse"></div>
            </div>
            <h1 className="text-xl font-bold text-[#006064] drop-shadow-lg">
              Jazaro
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/notifications">
            <Bell className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
          </Link>
          <NavProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
