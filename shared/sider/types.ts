import { SiderProps } from "antd";
import { BasicDataNode } from "antd/es/tree";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type GlobalAppPropsWithLayout = AppProps & {
  Component?: NextPageWithLayout;
};

export interface IHtmlDivElementProps extends BasicDataNode {
  children: ReactElement;
}

export interface IClientLayoutProps extends IHtmlDivElementProps {}
export interface IClientSiderProps extends SiderProps {
  menuItems: Array<ItemType<MenuItemType>>;
}
export interface IClientHeaderProps extends IHtmlDivElementProps {}
export interface IClientFooterProps extends IHtmlDivElementProps {}
