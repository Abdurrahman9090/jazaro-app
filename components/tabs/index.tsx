/* eslint-disable no-unused-vars */
import { Tabs } from "antd";
import React, { CSSProperties, useState } from "react";
import { ITabsProps, ITabPaneProps } from "./types";

const { TabPane } = Tabs;

/**
 * Antd Customized Tabs Layout component
 *
 * @param {ITabsProps & ITabPaneProps} props - Properties of the Tab Pane and Tabs
 * @returns {React.FC} Tab layout component
 */
const ScalableTabs: React.FC<ITabsProps & ITabPaneProps> = (
  props: ITabsProps & ITabPaneProps
) => {
  const {
    className,
    disabled,
    tabPosition,
    forceRender,
    applyBarStyles,
    layoutContainerId,
    ...rest
  } = props;

  return (
    <Tabs
      centered
      animated={tabPosition === "top" || tabPosition === "left"}
      tabPosition={tabPosition}
      {...rest}
    >
      {props.tabs.map((tab, idx) => {
        return (
          <TabPane
            destroyInactiveTabPane={true}
            tab={tab.tabTitle}
            key={tab.key || idx}
            disabled={props.disabled ? props.disabled : false}
            forceRender={props.forceRender ? props.forceRender : false}
          >
            {tab.tabContent}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default ScalableTabs;
