import React from "react";
import Link from "next/link";

import { Menu, Bell, User } from "lucide-react";
import { AuthSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/actions/authActions";

// antd imports
import { Button, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";

const Header = ({ onMenuClick = () => {} }) => {
  const { user } = useSelector(AuthSelector);
  const dispatch = useAppDispatch();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link href="/profile" className="text-[#006064] hover:text-[#00838F]">
          Profile Settings
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span 
          className="text-[#006064] hover:text-[#00838F] cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          Logout
        </span>
      ),
    },
  ];

  return (
    <header className="relative sticky max-w-md mx-auto z-50 bg-white/70 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            onClick={onMenuClick}
            className="focus:outline-none p-0 border-0 shadow-none"
            aria-label="Open menu"
            icon={<Menu className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />}
          />
          {/* 3D Jazaro Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              {/* 3D Cube Effect */}
              <div className="w-8 h-8 relative transform-gpu perspective-1000">
                <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-lg shadow-lg transform rotate-12 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-lg opacity-80 transform translate-x-1 translate-y-1"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm transform -rotate-12 drop-shadow-lg">
                      J
                    </span>
                  </div>
                </div>
              </div>
              {/* Glowing Core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_10px_rgba(0,188,212,0.8)] animate-pulse"></div>
            </div>
            <h1 className="text-xl font-bold text-[#006064] drop-shadow-lg">
              Jazaro
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/notifications">
            <Bell className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
          </Link>
          {/* antd dropdown for user profile */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
            overlayClassName="w-40"
          >
            <Button
              type="text"
              className="focus:outline-none p-0 border-0 shadow-none flex items-center gap-2"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Avatar
                size={32}
                className="bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] border-2 border-[#00BCD4]/30"
                icon={<User className="h-5 w-5 text-white" />}
              />
              <span className="text-[#006064] font-semibold text-base truncate max-w-[100px]">
                {user?.username}
              </span>
            </Button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
