"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

interface IDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SheetDrawer = (props: IDrawerProps) => {
  const { open, setOpen } = props;

  return (
    <div className="max-w-md mx-auto">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"}>
          {/* Drawer Header with Cover and Profile */}
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-b-2xl shadow-md">
            {/* Cover Image */}
            <div className="w-full h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl mb-8 relative" />
            {/* Profile Avatar */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                {/* Replace with user profile image if available */}
                <span className="text-3xl font-bold text-blue-600">U</span>
              </div>
            </div>
            {/* User Info */}
            <div className="mt-14 text-center">
              <h2 className="text-lg font-semibold text-white">Username</h2>
              <p className="text-sm text-blue-100">user@email.com</p>
            </div>
          </div>

          {/* Drawer Items */}
          <div className="mt-8 flex flex-col gap-1">
            <Button
              variant="ghost"
              className="justify-start w-full text-left text-blue-700 hover:bg-blue-50 flex items-center gap-3 py-4"
            >
              <span className="inline-flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <path d="M3 12l9-9 9 9" />
                  <path d="M9 21V9h6v12" />
                </svg>
              </span>
              Home
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left text-blue-700 hover:bg-blue-50 flex items-center gap-3 py-4"
            >
              <span className="inline-flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <circle cx="11" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
                </svg>
              </span>
              Profile
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left text-blue-700 hover:bg-blue-50 flex items-center gap-3 py-4"
            >
              <span className="inline-flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </span>
              Settings
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left text-blue-700 hover:bg-blue-50 flex items-center gap-3 py-4"
            >
              <span className="inline-flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <path d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </span>
              Bookings
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left text-blue-700 hover:bg-blue-50 flex items-center gap-3 py-4"
            >
              <span className="inline-flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <path d="M8 17l4 4 4-4M12 12v9" />
                  <rect x="3" y="3" width="18" height="4" rx="2" />
                </svg>
              </span>
              History
            </Button>
          </div>

          {/* Drawer Footer */}
          <div className="mt-8 mb-2">
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2 py-4"
                  onClick={() => {
                    // TODO: Add logout logic here
                    setOpen(false);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white"
                  >
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    <path d="M3 21V3a2 2 0 012-2h6" />
                  </svg>
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetDrawer;
