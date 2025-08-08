import { IFixer, IFixerState } from "@/types/reduxTypes/fixer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IFixerState = {
  fixers: null,
  fixersLoading: false,
};

const FixerSlice = createSlice({
  name: "fixer",
  initialState,
  reducers: {
    getFixersSuccess: (state, { payload }: PayloadAction<IFixer[]>) => {
      state.fixers = payload;
      state.fixersLoading = false;
    },
    getFixersFailure: (state) => {
      state.fixersLoading = false;
    },
    deleteFixerSuccess: (state, { payload }: PayloadAction<string[]>) => {
      state.fixers =
        state.fixers?.filter((x) => {
          return !payload.includes(x._id);
        }) || [];
    },
    deleteFixerFailure: (state) => {
      return state;
    },
    fixerReset: () => {
      return initialState;
    },
  },
});

export const {
  getFixersSuccess,
  getFixersFailure,
  deleteFixerSuccess,
  deleteFixerFailure,
  fixerReset,
} = FixerSlice.actions;

export default FixerSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<FixerState>} state - The state of fixers
 * @param {FixerState} state.fixer - The state of fixer state
 * @returns {FixerState} returns fixer state object
 */
export const FixerSelector = (state: { fixer: IFixerState }): IFixerState => {
  return state.fixer;
};
