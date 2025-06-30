import React from "react";
import Link from "next/link";
import { Image, Layout, Menu } from "antd";
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
    <Sider {...props}>
      <div
        style={{
          height: 38,
          margin: 12,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={"/"}>
          {collapsed ? (
             <span className="font-bold text-xl text-blue-600 tracking-widest">J</span>
          ) : (
            <span className="font-bold text-xl text-blue-600 tracking-widest">Jazaro</span>
          )}
        </Link>
      </div>
      <hr
        style={{
          border: "none",
          height: "2px",
          background:
            "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 5), rgba(255, 255, 255, 0))",
        }}
      />
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
