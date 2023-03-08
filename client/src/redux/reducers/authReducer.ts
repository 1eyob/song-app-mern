import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { setLoggedIn, setUserData, setError, clearError, logout } =
  authSlice.actions;

export default authSlice.reducer;
