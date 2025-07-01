import { TabsProps, TabPaneProps } from "antd";
import React from "react";

export interface ITabContent {
  key?: string;
  tabTitle: string | React.ReactElement;
  tabContent?: React.ReactElement;
}

export interface ITemplateTabContent {
  key?: string;
  title: string | React.ReactElement;
  riskScore?: number;
  description?: string;
}

export interface ITabsProps extends TabsProps {
  tabs: Array<ITabContent> | [];
}

export interface ITabPaneProps extends TabPaneProps {
  layoutContainerId?: string;
  applyBarStyles?: boolean;
}
