"use client";

import ClientLayout from "@/components/layouts/userLayout";
import { loadUser } from "@/redux/actions/authActions";
import { AuthSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

const UserClientLayout = ({ children }: { children: ReactElement }) => {
  const AuthState = useSelector(AuthSelector);
  const router = useRouter();
  const { user, isAuthenticated } = AuthState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (!user && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [user, isAuthenticated, router]);

  return <ClientLayout>{children}</ClientLayout>;
};

export default UserClientLayout;
