import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../api/authApi";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
