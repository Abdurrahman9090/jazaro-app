import { Layout, Menu, Button, Avatar, Dropdown, Space, Badge } from "antd";
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

import { logout } from "@/redux/actions/authActions";

const { Header: AntHeader, Sider, Content } = Layout;

const AdminLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: "fixers",
      icon: <ToolOutlined />,
      label: "Fixers",
    },
    {
      key: "requests",
      icon: <FileTextOutlined />,
      label: "Requests",
    },
    {
      key: "analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

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
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white shadow-lg border-r border-gray-200"
        width={250}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <h1
              className={`text-xl font-bold text-gray-800 transition-all duration-300 ${
                collapsed ? "text-center" : ""
              }`}
            >
              {collapsed ? "J" : "Jazaro Panel"}
            </h1>
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="border-r-0"
          onClick={({ key }) => setSelectedKey(key)}
        />
      </Sider>

      <Layout>
        <AntHeader className="bg-white px-6 flex items-center justify-between shadow-sm border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:text-gray-800"
            />
            <div className="text-lg font-semibold text-gray-800">
              {menuItems.find((item) => item.key === selectedKey)?.label}
            </div>
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
              <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="text-gray-700 font-medium">Admin</span>
              </Space>
            </Dropdown>
          </div>
        </AntHeader>

        <Content className="m-6 p-6 bg-gray-50 rounded-lg min-h-[calc(100vh-120px)]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
