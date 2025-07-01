"use client";

import { loadUser } from "@/redux/actions/authAction";
import { AuthSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { UserRoles } from "@/types";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  const AuthState = useSelector(AuthSelector);
  const router = useRouter();
  const { user, isAuthenticated, loading } = AuthState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      router.push(
        user.role === UserRoles.Client ? "/user/dashboard" : "/admin/dashboard"
      );
    }
  }, [user, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-white text-lg font-medium animate-pulse">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
