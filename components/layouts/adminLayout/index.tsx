import { Layout, Button, Badge, Grid } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import { ClientSider } from "@/shared/sider";
import { UserRoles } from "@/types";
import { siderClientMenuItems, siderAdminMenuItems } from "@/routes/sider";
import { AuthSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import NavProfile from "@/components/navProfile";

const { useBreakpoint } = Grid;
const { Header: AntHeader, Content } = Layout;

const AdminLayout = ({ children }: any) => {
  const { xs } = useBreakpoint();
  const { user } = useSelector(AuthSelector);
  const [collapsed, setCollapsed] = useState(false);

  const routes =
    user?.role === UserRoles.Admin ? siderAdminMenuItems : siderClientMenuItems;

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

            <NavProfile />
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
