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
      styles={{ body: { padding: 0 } }}
    >
      {/* Drawer Header with Ant Design components */}
      <div style={{ 
        background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)", 
        padding: 32, 
        borderBottomLeftRadius: 24, 
        borderBottomRightRadius: 24, 
        textAlign: "center", 
        position: "relative" 
      }}>
        <Avatar
          size={80}
          style={{
            border: "4px solid white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f3f4f6",
            marginBottom: 16,
          }}
        >
          U
        </Avatar>
        <Title level={4} style={{ color: "white", margin: 0 }}>
          Username
        </Title>
        <Text style={{ color: "#bfdbfe", fontSize: "14px" }}>
          user@email.com
        </Text>
      </div>

      {/* Drawer Items using Ant Design List */}
      <List
        itemLayout="horizontal"
        dataSource={menuItems}
        renderItem={item => (
          <List.Item style={{ padding: 0 }}>
            <Button
              type="text"
              icon={item.icon}
              style={{
                width: "100%",
                textAlign: "left",
                color: "#2563eb",
                padding: "20px 24px",
                fontWeight: 500,
                fontSize: 16,
                borderRadius: 0,
              }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Button>
          </List.Item>
        )}
        style={{ marginTop: 32 }}
      />

      {/* Drawer Footer with Ant Design Button */}
      <div style={{ margin: "32px 16px 8px 16px" }}>
        <Button
          danger
          type="primary"
          icon={<LogoutOutlined />}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 0",
            fontSize: 16,
          }}
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
