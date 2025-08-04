import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice"; // 👈 Import logout action

// Load from localStorage
const savedCart = localStorage.getItem("cart");

const initialState = savedCart
  ? JSON.parse(savedCart)
  : {
      products: [],
      totalQuantity: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantity || 1;
      const priceToAdd = newItem.price * quantityToAdd;

      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice += priceToAdd;
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: quantityToAdd,
          totalPrice: priceToAdd,
          image: newItem.image,
        });
      }

      state.totalPrice += priceToAdd;
      state.totalQuantity += quantityToAdd;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);

      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.products = state.products.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);

      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state.totalQuantity++;
        state.totalPrice += findItem.price;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);

      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
      } else if (findItem && findItem.quantity === 1) {
        state.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.products = state.products.filter((item) => item.id !== id);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },

  // 👇 Extra reducer to reset cart on logout
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      localStorage.removeItem("cart"); // 🔥 Remove from localStorage
      return {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;