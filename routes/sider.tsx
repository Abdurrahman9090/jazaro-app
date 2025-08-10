import { UserRoles } from "@/types";
import { SiderRoutes } from "./types";
import {
  DashboardFilled,
  OrderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  AppstoreOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { MenuItem } from "./getItem";

export const siderClientRoutes: Array<SiderRoutes> = [
  {
    title: "Dashboard",
    label: <Link href={"/user/dashboard"}>Dashboard</Link>,
    key: "0",
    icon: <DashboardFilled style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Client],
  },
  {
    title: "fixer",
    label: <Link href={"/user/fixer"}>Dashboard</Link>,
    key: "1",
    icon: <DashboardFilled style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Client],
  },

  {
    title: "Messages",
    label: <Link href={"/user/messages"}>Messages</Link>,
    key: "2",
    icon: <OrderedListOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Client],
  },
  {
    title: "History",
    label: <Link href={"/user/users"}>History</Link>,
    key: "3",
    icon: <UserSwitchOutlined style={{ fontSize: 18 }} />,
  },
  {
    title: "Account",
    label: <Link href={"/user/account"}>Account</Link>,
    key: "4",
    icon: <UserOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Client],
  },
];

export const siderAdminRoutes: Array<SiderRoutes> = [
  {
    title: "Dashboard",
    label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    key: "1",
    icon: <DashboardFilled style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    title: "Users",
    label: <Link href={"/admin/users"}>Users</Link>,
    key: "2",
    icon: <OrderedListOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    title: "Fixers",
    label: <Link href={"/admin/fixers"}>Fixers</Link>,
    key: "3",
    icon: <UserSwitchOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    title: "Categories",
    label: <Link href={"/admin/categories"}>Categories</Link>,
    key: "4",
    icon: <AppstoreOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    title: "Transaction",
    label: <Link href={"/admin/transaction"}>Transaction</Link>,
    key: "5",
    icon: <DollarOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    title: "Live Map",
    label: <Link href={"/admin/live-map"}>Live Map</Link>,
    key: "6",
    icon: <EnvironmentOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
  {
    title: "Account",
    label: <Link href={"/admin/account"}>Account</Link>,
    key: "7",
    icon: <UserOutlined style={{ fontSize: 18 }} />,
    authenticatedUsers: [UserRoles.Admin],
  },
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const siderClientMenuItems: MenuItem[] = siderClientRoutes.map((route) =>
  getItem(route.label, route.key, route.icon)
);

export const siderAdminMenuItems: MenuItem[] = siderAdminRoutes.map((route) =>
  getItem(route.label, route.key, route.icon)
);
