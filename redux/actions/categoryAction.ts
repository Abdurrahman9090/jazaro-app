import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendInstance, config } from "@/config/index";
import {
  getCategoriesSuccess,
  getCategoriesFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
  addEditCategorySuccess,
  addEditCategoryFailure,
} from "../reducers/categoryReducer";
import { updateAlert } from "./alertAction";
import { handlerError } from "@/utils/ErrorHandler";
import { ICategoryAddEditAction } from "@/types/reduxTypes/category";

/**
 * Get all categories
 * @returns {boolean} - True if successful, false otherwise
 */
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { dispatch }) => {
    try {
      const res = await BackendInstance.get(`category/`);
      dispatch(getCategoriesSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getCategoriesFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

/**
 * Add or update category
 * @param {ICategory} data - The category data for add/update
 * @returns {boolean} - True if successful, false otherwise
 */
export const addEditCategory = createAsyncThunk(
  "category/addEditCategory",
  async (data: ICategoryAddEditAction, { dispatch }) => {
    const body = JSON.stringify(data);
    console.log(data);
    try {
      const endpoint = data._id ? `category/${data._id}` : "category/create";
      const method = data._id ? "put" : "post";
      const res = await BackendInstance[method](endpoint, body, config);
      dispatch(addEditCategorySuccess(res.data.data));
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      dispatch(addEditCategoryFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);

/**
 * Delete categories
 * @param {Array<string>} categoryIds - Array of category IDs to delete
 * @returns {boolean} - True if successful, false otherwise
 */
export const deleteCategories = createAsyncThunk(
  "category/deleteCategory",
  async (categoryIds: Array<string>, { dispatch }) => {
    try {
      const res = await BackendInstance.delete("category/remove-category", {
        ...config,
        data: { categoryIds: categoryIds },
      });
      dispatch(deleteCategorySuccess(res.data.data));
      dispatch(
        updateAlert({
          place: "tc",
          message: "Categories Deleted Successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err) {
      dispatch(deleteCategoryFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);
