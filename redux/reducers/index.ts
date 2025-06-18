import { combineReducers } from "@reduxjs/toolkit";
// imports
import alertReducer, { AlertSelector } from "./alertReducer";
import authReducer, { AuthSelector } from "./authReducer";
import userReducer, { UserSelector } from "./userReducer";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  alert: alertReducer,
});

export { AuthSelector, UserSelector, AlertSelector };

export type RootState = ReturnType<typeof appReducer>;

/**
 * Resets state on logout if needed
 *
 * @param {RootState} state - current action state dispatched from actions
 * @param {any} action - current action dispatched
 * @returns {Reducer<CombinedState>} returns combined state
 */
export const rootReducer = (state: RootState, action: any) => {
  if (action.type === "RESET") {
    return appReducer({} as RootState, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
