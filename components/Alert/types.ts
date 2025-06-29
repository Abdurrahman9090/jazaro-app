import { NotificationArgsProps } from "antd";

export interface IAlertProps {
  duration?: number;
  placement?: NotificationArgsProps["placement"];
}
export enum IAlertType {
  danger = "error",
  success = "success",
  warning = "warning",
  info = "info",
}
