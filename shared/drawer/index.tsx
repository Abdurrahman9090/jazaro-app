"use client";

import type React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Search,
  Calendar,
  CheckSquare,
  UserPlus,
  Settings,
  Info,
  LogOut,
  User,
} from "lucide-react";

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/" },
  { icon: <Search className="w-5 h-5" />, label: "Explore", href: "/explore" },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "My Events",
    href: "/events",
  },
  { icon: <CheckSquare className="w-5 h-5" />, label: "Tasks", href: "/tasks" },
  {
    icon: <UserPlus className="w-5 h-5" />,
    label: "Invite Friends",
    href: "/invite",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/settings",
  },
  { icon: <Info className="w-5 h-5" />, label: "About", href: "/about" },
];

interface MobileDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: {
    name: string;
    avatar?: string;
    eventCount?: number;
  };
}

const MobileDrawer = (props: MobileDrawerProps) => {
  const { user, open, setOpen } = props;

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log("Signing out...");
    setOpen(false);
  };

  // Custom left-to-right animated drawer using a fixed div and transition
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[120px] max-w-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ willChange: "transform" }}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <AvatarImage
                  src={user?.avatar || "/placeholder.svg"}
                  alt={user?.name}
                />
                <AvatarFallback className="bg-emerald-500 text-white">
                  {user?.name ? (
                    user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {user?.name || "Guest User"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user?.eventCount || 0} Events
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="space-y-1 px-4">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                >
                  <span className="text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sign Out Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 group"
            >
              <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
              <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileDrawer;
