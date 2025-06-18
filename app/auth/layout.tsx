"use client";

import { loadUser } from "@/redux/actions/authActions";
import { AuthSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { UserRoles } from "@/types";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  const AuthState = useSelector(AuthSelector);
  const router = useRouter();
  const { user, isAuthenticated } = AuthState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      router.push(user.role === UserRoles.Client ? "/dashboard" : "/auth");
    }
  }, [user, isAuthenticated, router]);

  return <>{children}</>;
};

export default AuthLayout;
