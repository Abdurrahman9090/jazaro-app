"use client";

import * as React from "react";
import { Drawer, Avatar, Typography, List, Button } from "antd";
import Icon, {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AuthSelector } from "@/redux/reducers";
import Link from "next/link";

const { Title, Text } = Typography;

interface IDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const menuItems = [
  { icon: HomeOutlined, label: "Home" },
  { icon: MessageOutlined, label: "Messages" },
  { icon: HistoryOutlined, label: "History" },
  { icon: MenuOutlined, label: "Bookings" },
  { icon: SettingOutlined, label: "Settings" },
];

const SheetDrawer = (props: IDrawerProps) => {
  const { open, setOpen } = props;

  const { user } = useSelector(AuthSelector);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      placement="left"
      width="320px"
      height={"100vh"}
      title={null}
      closable={false}
      styles={{
        body: {
          paddingInline: 0,
          background: "transparent",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Drawer Header */}
      <div className="bg-white/90 backdrop-blur-[12px] rounded-b-3xl text-center px-6 pt-10 pb-6 relative shadow-[0_4px_16px_rgba(0,188,212,0.18)] border-b border-[#00BCD4]/20">
        <div className="flex flex-col items-center gap-2">
          <Avatar
            size={88}
            src={user?.avatar || undefined}
            icon={<UserOutlined />}
            className="object-cover border-4 border-[#00BCD4] shadow-[0_6px_18px_rgba(0,188,212,0.18)] bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] text-[#00838F] font-bold text-[36px] mb-2"
          >
            U
          </Avatar>
          <Title
            level={4}
            className="!text-[#006064] !mb-0 !mt-2 !font-bold !text-lg md:!text-xl"
            style={{ letterSpacing: 0.5 }}
          >
            {user?.username}
          </Title>
          <Text className="!text-[#00838F] !text-xs md:!text-sm !font-medium">
            {user?.email}
          </Text>
        </div>
      </div>

      {/* Drawer Items */}
      <div className="flex-1 overflow-y-auto">
        <List
          itemLayout="horizontal"
          dataSource={menuItems}
          renderItem={(item) => (
            <List.Item className="ml-2">
              <Link
                href={`/${item.label.toLowerCase()}`}
                className="w-full flex gap-2 text-left text-[#00838F] hover:text-[#00BCD4] font-semibold text-base md:text-lg"
                onClick={() => setOpen(false)}
              >
                <Icon className="text-cyan-200 " component={item.icon} />
                <span className="flex-1">{item.label}</span>
              </Link>
            </List.Item>
          )}
          className="mt-2"
        />
      </div>

      {/* Drawer Footer - Logout Button fixed at bottom */}
      <div className="sticky bottom-2 px-2 z-10 flex flex-col items-center">
        <Button
          type="dashed"
          danger
          size="large"
          icon={<LogoutOutlined />}
          className="w-full mb-4 left-4 py-4 flex items-center justify-center text-base md:text-lg font-bold"
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
