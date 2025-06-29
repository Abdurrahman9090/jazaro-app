import React from "react";
import { notification } from "antd";
import { AuthErrors } from "@/types";
import { IAlertProps, IAlertType } from "./types";

// redux
import { useSelector } from "react-redux";
import { IAlert } from "@/types/reduxTypes/alert";
import { AlertSelector, removeAlert } from "@/redux/reducers/alertReducer";
import { humanize } from "@/utils";

const ignoreAlerts = [AuthErrors.LoginNeeded];
/**
 * antd notification
 *
 * @param {IAlertProps} props - Properties of the notification
 * @returns {React.FC} notification component
 */
const Alert: React.FC<IAlertProps> = (props: IAlertProps) => {
  const [api, contextHolder] = notification.useNotification();

  const AlertState = useSelector(AlertSelector);
  const { placement, duration } = props;
  const zero = 0;
  const one = 1;
  const three = 3;

  notification.config({
    placement: placement || "top",
    duration: duration || three,
    rtl: false,
  });

  return (
    <>
      {contextHolder}
      {AlertState !== null &&
        AlertState.length > zero &&
        AlertState.filter((alert: IAlert) => {
          return ignoreAlerts.indexOf(alert.message as AuthErrors) === -one;
        }).forEach((alert: IAlert) => {
          const type = IAlertType[alert.type as keyof typeof IAlertType];
          notification?.[type]({
            key: alert.id,
            placement: "top",
            showProgress: true,
            message: humanize(alert.type as string),
            description: alert.message,
            onClose: () => {
              removeAlert(alert.id as IAlert);
            },
          });
        })}
    </>
  );
};

export default Alert;
