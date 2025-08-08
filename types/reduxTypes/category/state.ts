import { ICategory } from "./reducer";

export interface ICategoryState{
    categories: ICategory[] | null;
    categoryLoading: boolean;
}