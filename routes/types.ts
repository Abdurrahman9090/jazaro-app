import React from "react";
import { UserRoles } from "@/types";
import { MenuProps } from "antd";
import { DashboardOutlined } from "@ant-design/icons";

interface ISiderChildRoutes {
  id: string;
  label: string;
  display?: boolean;
  icon: typeof DashboardOutlined;
  authenticatedUsers?: Array<UserRoles>;
}

interface SiderRoutes {
  key: string;
  label: React.ReactNode;
  title: string;
  display?: boolean;
  icon: React.ReactNode;
  authenticatedUsers?: Array<UserRoles>;
}

export type { SiderRoutes };
