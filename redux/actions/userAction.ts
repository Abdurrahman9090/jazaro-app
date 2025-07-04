import {
  getUsersSuccess,
  getUsersFailure,
  deleteUserSuccess,
  deleteUserFailure,
  addEditUserSuccess,
  addEditUserFailure,
  userReset,
} from "../reducers/userReducer";
import { BackendInstance, config } from "@/config";
import { handlerError } from "@/utils/ErrorHandler";
import { updateAlert } from "./alertAction";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserAddEditFormData } from "@/types/reduxTypes/user";
import { ISearchParams } from "@/types";
import { updateUserProfileFailure } from "../reducers/authReducer";

export const getAllUsers = createAsyncThunk(
  "user/getUserPaginated",
  async (_, { dispatch }) => {
    // { page, pageSize, searchString }: ISearchParams
    try {
      const res = await BackendInstance.get(`user/`);
      dispatch(getUsersSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getUsersFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userIds: Array<string>, { dispatch }) => {
    try {
      const res = await BackendInstance.delete("user/delete-users", {
        ...config,
        data: { userIds: userIds },
      });
      dispatch(deleteUserSuccess(res.data.data));
      dispatch(
        updateAlert({
          place: "tc",
          message: "Users Deleted Successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err) {
      dispatch(deleteUserFailure());
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
 * add Update user
 * @param {IUserAddEditFormData} data - The data required for add update user
 * @returns {boolean} - True
 */
export const addUpdateUser = createAsyncThunk(
  "user/addUpdateUser",
  async (data: IUser, { dispatch }) => {
    const body = JSON.stringify(data);
    try {
      const res = await BackendInstance.post(
        `user/add-update-user`,
        body,
        config
      );
      dispatch(addEditUserSuccess(res.data.data));
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      dispatch(updateUserProfileFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);

export const addEditUser = createAsyncThunk(
  "user/addEditUser",
  async (data: IUserAddEditFormData, { dispatch }) => {
    const body = JSON.stringify(data);
    try {
      const res = await BackendInstance.post(
        "user/add-update-user",
        body,
        config
      );
      dispatch(addEditUserSuccess(res.data.data));
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      dispatch(addEditUserFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);

export const resetUser = createAsyncThunk(
  "user/resetUser",
  async (_, { dispatch }) => {
    try {
      dispatch(userReset());
      return true;
    } catch (err) {
      return false;
    }
  }
);
