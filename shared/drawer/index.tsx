"use client";

import * as React from "react";
import { Drawer, Avatar, Typography, List, Button, Space } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface IDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const menuItems = [
  { icon: <HomeOutlined />, label: "Home" },
  { icon: <UserOutlined />, label: "Profile" },
  { icon: <SettingOutlined />, label: "Settings" },
  { icon: <MenuOutlined />, label: "Bookings" },
  { icon: <HistoryOutlined />, label: "History" },
];

const SheetDrawer = (props: IDrawerProps) => {
  const { open, setOpen } = props;

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      placement="left"
      width={320}
      title={null}
      closable={false}
      styles={{ body: { padding: 0, background: 'transparent' } }}
      className="!bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]"
    >
      {/* Drawer Header with Ant Design components */}
      <div className="bg-white/80 backdrop-blur-[10px] rounded-b-2xl text-center p-8 relative shadow-[0_4px_10px_rgba(0,188,212,0.15)] border-b border-[#00BCD4]/20">
        <Avatar
          size={80}
          style={{
            border: "4px solid #00BCD4",
            boxShadow: "0 4px 10px rgba(0,188,212,0.15)",
            backgroundColor: "#E0F7FA",
            marginBottom: 16,
            color: '#00838F',
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          U
        </Avatar>
        <Typography.Title level={4} className="!text-[#006064] !mb-0 !mt-2 !font-bold">
          Username
        </Typography.Title>
        <Typography.Text className="!text-[#00838F] !text-sm">
          user@email.com
        </Typography.Text>
      </div>

      {/* Drawer Items using Ant Design List */}
      <List
        itemLayout="horizontal"
        dataSource={menuItems}
        renderItem={item => (
          <List.Item className="!p-0">
            <Button
              type="text"
              icon={item.icon}
              className="w-full text-left text-[#00838F] hover:text-[#00BCD4] px-6 py-4 font-medium text-base rounded-none transition-colors duration-200"
              style={{ background: 'transparent' }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Button>
          </List.Item>
        )}
        className="mt-8"
      />

      {/* Drawer Footer with Ant Design Button */}
      <div className="mx-4 mt-8 mb-2">
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          className="w-full flex items-center justify-center py-4 text-base rounded-[12px] bg-gradient-to-r from-[#00BCD4] to-[#00838F] border-0 text-white shadow-md hover:from-[#00838F] hover:to-[#00BCD4] transition-all duration-200"
          onClick={() => {
            // TODO: Add logout logic here
            setOpen(false);
          }}
        >
          Logout
        </Button>
      </div>
    </Drawer>
  );
};

export default SheetDrawer;
