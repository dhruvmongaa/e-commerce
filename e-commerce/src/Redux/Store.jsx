import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    auth: authSlice,
    modal: modalSlice,
  },
});

// ✅ Subscribe to store changes and save auth/cart to localStorage
store.subscribe(() => {
  const state = store.getState();

  // Only save what we need
  localStorage.setItem("auth", JSON.stringify(state.auth));
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export default store;