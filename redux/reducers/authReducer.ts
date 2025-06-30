import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeSecondaryToken } from "@/utils/Logout";
import { AuthState } from "@/types/reduxTypes/auth";
import { IUser } from "@/types/reduxTypes/user";

// TODO change this state by maniging it from redux
const initialState: AuthState = {
  user: null,
  role: null,
  token: null,
  avatar: null,
  loading: true,
  isRegistered: null,
  invalidToken: null,
  isAuthenticated: null,
  recentLoggedOut: false, // necessary when use logs out, change to true.
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    userLoaded: (state, { payload }: PayloadAction<AuthState>) => {
      const authToken = payload.token;
      delete payload.token;

      state.isAuthenticated = payload.isAuthenticated;
      state.loading = false;
      state.role = payload.role;
      state.user = payload.user;
      state.token = authToken;
    },
    csrfSuccess: (state) => {
      state.recentLoggedOut = false;
      return state;
    },
    changePasswordSuccess: (state) => {
      return state;
    },
    changePasswordFailure: (state) => {
      return state;
    },
    forgotPasswordSuccess: (state) => {
      return state;
    },
    forgotPasswordFailure: (state) => {
      return state;
    },
    resetPasswordSuccess: (state) => {
      return state;
    },
    resetPasswordFailure: (state) => {
      return state;
    },
    validToken: (state, { payload }: PayloadAction<AuthState>) => {
      state.invalidToken = payload.invalidToken;
    },
    signupSuccess: (state) => {
      return state;
    },
    signinSuccess: () => {},
    signinFailure: (state) => {
      return state;
    },
    updateUserProfileSuccess: (state, { payload }: PayloadAction<IUser>) => {
      state.user = { ...state.user, ...payload };
    },
    updateUserProfileFailure: (state) => {
      return state;
    },
    authReset: () => {
      return {
        ...initialState,
        recentLoggedOut: true,
      };
    },
    clearSession: (state) => {
      removeSecondaryToken();
      state.isAuthenticated = false;
      state.loading = false;
      /**
       * Dont set recentLoggedOut: true
       * here because as recentLoggedOut is set
       * in AuthLayout for loading condition and first
       * load user goes to catch (because of unathorization)
       * where this reducer is called which will make login
       * page in an ifinite loop.
       */
    },
  },
});

export const {
  userLoaded,
  csrfSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  validToken,
  signupSuccess,
  signinSuccess,
  authReset,
  clearSession,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<AuthState>} state - The state of authentication
 * @param {AuthState} state.auth - The state of auth state
 * @returns {AuthState} returns auth state object
 */
export const AuthSelector = (state: { auth: AuthState }): AuthState => {
  return state.auth;
};
