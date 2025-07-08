import { IFixer } from "./reducer";

export interface IFixerState {
  fixers: IFixer[] | null;
  fixersLoading: boolean;
}
