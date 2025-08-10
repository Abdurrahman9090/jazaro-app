import type { MenuProps } from "antd";
import React from "react";

export type MenuItem = Required<MenuProps>["items"][number] & {
  route: string;
  children?: MenuItem[];
  label: React.ReactElement;
  icon?: React.ReactNode | null;
  key?: React.Key | null;
  navigable: boolean;
  labelText: string;
};

/**
 * Template to produce MenuItem for Menu component
 *
 * @param {React.ReactNode} label - label to display for the menu item
 * @param {string} path - route path
 * @param {boolean} rootNavigable - route path
 * @param {string} labelText - label text string
 * @param {React.Key | null} key - key for menu item
 * @param {React.ReactNode} icon - icon to display for the menu item
 * @param {MenuItem[]} children - submenu children for the menu item
 * @param {string | null} id - id of the menu item
 * @param {string} type - type of the menu item
 * @param {boolean} disabled - whether the menu item is disabled
 * @returns {MenuItem} returns MenuItem object
 */
export default function getItem(
  label: React.ReactNode,
  path: string,
  rootNavigable: boolean,
  labelText: string,
  key?: React.Key | null,
  icon?: React.ReactNode | null,
  children?: MenuItem[],
  id?: string | null,
  type?: "group",
  disabled?: boolean
): MenuItem {
  return {
    id: id,
    key: key,
    icon: icon,
    navigable: rootNavigable,
    children: children,
    label: label,
    type: type,
    disabled: disabled,
    route: path,
    labelText: labelText,
  } as MenuItem;
}
