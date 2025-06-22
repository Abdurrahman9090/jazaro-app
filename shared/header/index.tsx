import React from "react";
import Link from "next/link";

import { Menu, Bell, User } from "lucide-react";
import { AuthSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/actions/authActions";

// shadcn dropdown-menu imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = ({ onMenuClick = () => {} }) => {
  const { user } = useSelector(AuthSelector);
  const dispatch = useAppDispatch();

  return (
    <header className="relative sticky max-w-md mx-auto z-50 bg-white/70 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
          </button>
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
          {/* shadcn dropdown-menu for user profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="focus:outline-none flex"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] shadow-md border-2 border-[#00BCD4]/30">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[#006064] font-semibold text-base truncate max-w-[100px]">
                    {user?.username}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-white border border-[#00BCD4]/20 rounded-lg shadow-lg z-50"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-[#006064] hover:bg-[#E0F7FA] rounded-t-lg transition-colors"
                >
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="w-full text-left px-4 py-2 text-[#006064] hover:bg-[#E0F7FA] rounded-b-lg transition-colors cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
