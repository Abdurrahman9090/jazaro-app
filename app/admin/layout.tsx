"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { AuthSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { loadUser } from "@/redux/actions/authAction";
import React, { ReactElement, useEffect } from "react";
import AdminLayout from "@/components/layouts/adminLayout";

const UserAdminLayout = ({ children }: { children: ReactElement }) => {
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

  return <AdminLayout>{children}</AdminLayout>;
};

export default UserAdminLayout;
