export type AlertPosition =
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export enum IAlertType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface IAlert {
  id: string | number;
  type: IAlertType | keyof typeof IAlertType | string;
  message: string;
  position?: AlertPosition;
  duration?: number;
  [key: string]: any; // for extensibility (other properties)
}

export interface IAlertProps {
  placement?: AlertPosition;
  duration?: number;
}
