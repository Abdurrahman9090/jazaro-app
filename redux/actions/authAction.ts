import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, BackendInstance } from "@/config";
import { ILoginFormData, IRegisterFormData } from "@/types/reduxTypes/auth";
import { handlerError } from "@/utils/ErrorHandler";
import { updateAlert } from "./alertAction";
import {
  authReset,
  clearSession,
  signupSuccess,
  userLoaded,
} from "@/redux/reducers/authReducer";
import { IUser } from "@/types/reduxTypes/user";
import { userLogout } from "@/utils/Logout";

/**
 * creates user session and logs them in
 *
 * @returns {boolean} true if login form is valid and successful, false otherwise
 */
export const signin = createAsyncThunk(
  "loginSlice/signin",
  async (formData: ILoginFormData, { dispatch }) => {
    const body = JSON.stringify(formData);
    try {
      const res = await BackendInstance.post("auth/login", body, config);
      // dispatch(signinSuccess());
      await dispatch(loadUser());
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });

      dispatch(clearSession());
      return false;
    }
  }
);

/**
 * signup new user
 *
 * @returns {boolean} signup
 */
export const signup = createAsyncThunk(
  "registerSlice/signup",
  async (formData: IRegisterFormData, { dispatch }) => {
    const body = JSON.stringify(formData);
    console.log(formData);
    try {
      const res = await BackendInstance.post("user/register", body, config);
      dispatch(signupSuccess());
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

/**
 * loads current user to state
 *
 * @returns {boolean} true if user is loaded successfully
 */
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { dispatch }) => {
    try {
      // const csrfRequest = await BackendInstance.get('csrf');
      // setCsrfToken(csrfRequest.data.data.csrfToken);
      // dispatch(csrfSuccess());
      const res = await BackendInstance.get("auth/authorization");
      const { role, token } = res.data.data;
      await dispatch(
        userLoaded({
          role: role,
          user: { ...res.data.data } as IUser,
          token: token,
          isAuthenticated: true,
        })
      );
      return true;
    } catch (err) {
      dispatch(clearSession());
      return false;
    }
  }
);

/**
 * Logs out user and clears session
 *
 * @returns {boolean} true if the session is cleared, false otherwise
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    let returnValue = false;
    try {
      /*
            {FOR OFFLINE USE}
            First call api then dispatch
            action beacuse logout requires
            secondary token while dispatching
            logout action remove that.
            */
      await userLogout();
      // const csrfRequest = await BackendInstance.get('csrf');
      // setCsrfToken(csrfRequest.data.data.csrfToken);

      returnValue = true;
    } catch (err) {
      return returnValue;
    } finally {
      dispatch({ type: "RESET" });
      dispatch(authReset());
      dispatch(clearSession());
      // eslint-disable-next-line no-unsafe-finally
      return returnValue;
    }
  }
);
