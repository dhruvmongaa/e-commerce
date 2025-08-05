import { createSlice } from "@reduxjs/toolkit";

// Step 1: Load from localStorage if available
const savedAuth = localStorage.getItem("auth");

const initialState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      isLoggedIn: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;

      // Step 2: Save to localStorage on login
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isLoggedIn: true,
          user: action.payload,
        })
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;

      // Step 3: Remove from localStorage on logout
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;