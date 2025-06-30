"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { AuthSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { loadUser } from "@/redux/actions/authAction";
import React, { ReactElement, useEffect } from "react";
import ClientLayout from "@/components/layouts/userLayout";

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
