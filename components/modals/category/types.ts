import { ICategory } from "@/types/reduxTypes/category";

export interface ICategoryModalProps {
  edit?: boolean;
  dataSet?: ICategory;
  modalVisibility: boolean;
  setDataSet: (value?: ICategory) => void;
  setModalVisibility: (value: boolean) => void;
  deleteEventListener?: React.MouseEventHandler<HTMLElement>;
  updateEventListener?: React.MouseEventHandler<HTMLElement>;
  addEventListener?: React.MouseEventHandler<HTMLElement>;
}
