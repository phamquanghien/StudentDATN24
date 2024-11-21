import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponseLoginType, AuthType } from "@/models/Auth";
import { AxiosError } from "axios";

export interface AuthState {
  login: {
    data: AuthResponseLoginType | null;
    loading: boolean;
    error: AxiosError<{ message: string }, any> | null;
  };
  logout: {
    success: boolean;
    loading: boolean;
    error: AxiosError | null;
  };
}

const initialState: AuthState = {
  login: {
    data: null,
    loading: false,
    error: null,
  },
  logout: {
    success: false,
    loading: false,
    error: null,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, _action: PayloadAction<AuthType>) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponseLoginType>) => {
      window.location.href = "/";
      state.login.data = action.payload;
      state.login.loading = false;
    },
    loginFailed: (
      state,
      action: PayloadAction<AxiosError<{ message: string }, any>>,
    ) => {
      state.login.error = action.payload;
      state.login.loading = false;
    },
    resetLogin: (state) => {
      state.login.data = null;
      state.login.error = null;
    },
  },
});

export const { login, loginSuccess, loginFailed, resetLogin } =
  AuthSlice.actions;
export default AuthSlice.reducer;
