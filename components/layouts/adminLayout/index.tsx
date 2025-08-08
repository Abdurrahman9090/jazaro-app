import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Badge,
  Grid,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  HomeOutlined,
  ToolOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

import { logout } from "@/redux/actions/authAction";
import { ClientSider } from "@/shared/sider";
import { UserRoles } from "@/types";
import { getClientRoutes, siderAdminRoutes } from "@/routes/sider";
import { AuthSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { humanize } from "@/utils";

const { useBreakpoint } = Grid;
const { Header: AntHeader, Content } = Layout;

const AdminLayout = ({ children }: any) => {
  const { xs } = useBreakpoint();
  const router = useRouter();
  const { user } = useSelector(AuthSelector);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useAppDispatch();

  const routes =
    user?.role === UserRoles.Admin
      ? siderAdminRoutes
      : getClientRoutes(user?.role || "");

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      dispatch(logout());
    } else {
      // Navigate to the corresponding page
      router.push(`/admin/${key}`);
    }
  };

  return (
    <Layout className="min-h-screen">
      <ClientSider
        theme="light"
        width={220}
        breakpoint="xs"
        className="relative"
        collapsedWidth={xs ? 0 : 70}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        menuItems={routes}
      />

      <Layout className="relative">
        <AntHeader className=" bg-white px-6 flex items-center justify-between shadow-sm border-b border-gray-200">
          <div className="flex items-center ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:text-gray-800"
            />
            <div className="text-lg font-semibold text-gray-800">DashBoard</div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge count={5} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="text-gray-600 hover:text-gray-800"
              />
            </Badge>

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleMenuClick,
              }}
              placement="bottomRight"
            >
              <Space className="cursor-pointer px-3 rounded-lg transition-colors">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="text-gray-700 font-medium">
                  {humanize(user?.username || "Admin")}
                </span>
              </Space>
            </Dropdown>
          </div>
        </AntHeader>

        <Content className="p-4 rounded-lg min-h-[calc(100vh-120px)]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
