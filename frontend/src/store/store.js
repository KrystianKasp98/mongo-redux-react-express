import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../reducers/itemSlice";
import cartSlice from "../reducers/cartSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartSlice
  }
});
