import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFixersSuccess,
  getFixersFailure,
  deleteFixerSuccess,
  deleteFixerFailure,
} from "@/redux/reducers/fixerReducer";
import { BackendInstance, config } from "@/config";

// Async thunk for getting all fixers
export const getFixers = createAsyncThunk(
  "fixer/getFixers",
  async (_, { dispatch }) => {
    try {
      const response = await BackendInstance.get("fixer/", config);
      dispatch(getFixersSuccess(response.data.data));
    } catch (error) {
      dispatch(getFixersFailure());
      throw error;
    }
  }
);

// Async thunk for deleting fixers
export const deleteFixers = createAsyncThunk(
  "fixer/deleteFixers",
  async (fixerIds: string[], { dispatch }) => {
    try {
      await BackendInstance.delete("/fixer", {
        ...config,
        data: { fixerIds: fixerIds },
      });
      dispatch(deleteFixerSuccess(fixerIds));
      return fixerIds;
    } catch (error) {
      dispatch(deleteFixerFailure());
      throw error;
    }
  }
);
