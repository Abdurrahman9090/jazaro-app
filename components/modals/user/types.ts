import { IUser } from "@/types/reduxTypes/user";

export interface IUserModalProps {
  dataSet?: IUser;
  edit?: boolean;
  modalVisibility: boolean;
  setDataSet: (value?: IUser) => void;
  setModalVisibility: (value: boolean) => void;
  deleteEventListener?: React.MouseEventHandler<HTMLElement>;
  updateEventListener?: React.MouseEventHandler<HTMLElement>;
  addEventListener?: React.MouseEventHandler<HTMLElement>;
}
