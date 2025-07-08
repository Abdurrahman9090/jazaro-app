import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  ICategory } from "@/types/reduxTypes/category/reducer";
import { ICategoryState } from "@/types/reduxTypes/category/state";

const initialState: ICategoryState = {
  categories: null,
  categoryLoading: true,
};

const CategorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getCategoriesSuccess: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.categories = payload;
      state.categoryLoading = false;
    },
    getCategoriesFailure: (state) => {
      state.categoryLoading = false;
    },
    deleteCategorySuccess: (state, { payload }: PayloadAction<string[]>) => {
      state.categories = state.categories?.filter((x) => {
        return !payload.includes(x._id);
      }) || [];
    },
    deleteCategoryFailure: (state) => {
      return state;
    },
    addEditCategorySuccess: (state, { payload }: PayloadAction<ICategory>) => {
      if (state.categories) {
        const categoryExists = state.categories.findIndex((category) => {
          return category._id === payload._id;
        });
        if (categoryExists !== -1) {
          state.categories[categoryExists] = payload;
        } else {
          state.categories.push(payload);
        }
      } else {
        state.categories = [payload];
      }
    },
    addEditCategoryFailure: (state) => {
      return state;
    },
    categoryReset: () => {
      return initialState;
    },
  },
});

export const {
  getCategoriesSuccess,
  getCategoriesFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
  addEditCategorySuccess,
  addEditCategoryFailure,
  categoryReset,
} = CategorySlice.actions;

export default CategorySlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<CategoryState>} state - The state of categories
 * @param {CategoryState} state.category - The state of category state
 * @returns {CategoryState} returns category state object
 */
export const CategorySelector = (state: { category: ICategoryState }): ICategoryState => {
  return state.category;
};
