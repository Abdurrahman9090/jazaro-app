"use client";

import React from "react";
import { UserRoles } from "@/types";
import { useSelector } from "react-redux";
import { AuthSelector } from "@/redux/reducers";
import FixerDashboard from "@/components/views/dashboards/FixerDashboard";
import ClientDashboard from "@/components/views/dashboards/ClientDashboard";

/*
 * combine fixer and client dashboard
 * render on role based proper
 */
const page = () => {
  const { role } = useSelector(AuthSelector);

  if (role === UserRoles.Fixer) {
    return <FixerDashboard />;
  }
  return <ClientDashboard />;
};

export default page;
