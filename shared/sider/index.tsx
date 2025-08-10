import React from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { IClientSiderProps } from "./types";

const { Sider } = Layout;

/**
 *
 * @param {IClientSiderProps} props - sider props
 * @returns {React.FC} returns sider component
 */
export const ClientSider: React.FC<IClientSiderProps> = (
  props: IClientSiderProps
) => {
  const { collapsed, menuItems, ...restProps } = props;

  return (
    <Sider {...restProps}>
      <Link
        href={"/"}
        className="h-16 border flex items-center justify-center bg-[#26C6DA]"
      >
        {collapsed ? (
          <span className="font-bold text-white text-3xl">J</span>
        ) : (
          <span className="font-bold text-white text-3xl">J a z a r o</span>
        )}
      </Link>
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        defaultActiveFirst={true}
        style={{ border: "none" }}
      />
    </Sider>
  );
};
