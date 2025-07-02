
import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      return [...state, action.payload];
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      return [];
    },
  },
});

const newArrivalsSlice = createSlice({
  name: "newArrivals",
  initialState: [],
  reducers: {
    addNewArrival: (state, action) => {
      return [action.payload, ...state.slice(0, 11)]; // Keep only latest 12 items
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const { addNewArrival } = newArrivalsSlice.actions;
export const selectCart = (state) => state.cart;
export const selectNewArrivals = (state) => state.newArrivals;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    newArrivals: newArrivalsSlice.reducer,
  },
});

export default store;
