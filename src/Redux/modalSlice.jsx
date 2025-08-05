import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  showLogin: true,
  pendingProduct: null, 
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isModalOpen = true;
      state.showLogin = true;
    },
    openRegisterModal: (state) => {
      state.isModalOpen = true;
      state.showLogin = false;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.pendingProduct = null; 
    },
    setPendingProduct: (state, action) => {
      state.pendingProduct = action.payload;
    },
    clearPendingProduct: (state) => {
      state.pendingProduct = null;
    },
  },
});

export const {
  openLoginModal,
  openRegisterModal,
  closeModal,
  setPendingProduct,
  clearPendingProduct,
} = modalSlice.actions;

export default modalSlice.reducer;
