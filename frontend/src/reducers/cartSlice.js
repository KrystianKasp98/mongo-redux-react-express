import { createSlice } from "@reduxjs/toolkit";
import { roundTotalCost } from "../utils";

const initialState = {
  items: [],
  totalCost : 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { payload } = action;
      const index = state.items.findIndex(item => item._id === payload._id);

      state.items = index === -1 ?
        [...state.items, { ...payload, value: 1 }] : state.items.map(item => item._id === payload._id ? { ...item, value: item.value + 1 } : item)

      state.totalCost = roundTotalCost(state.totalCost + payload.price);
    },
    sub: (state, action) => {
      const { payload } = action;
      const index = state.items.findIndex(item => item._id === payload._id);

      if (index !== -1) {
        state.items = state.items.map(item => item._id === payload._id ? { ...item, value: item.value - 1 } : item)

        if (state.items[index].value === 0) {
          state.items = state.items.filter(item => item._id !== action.payload._id)
        }
        state.totalCost = roundTotalCost(state.totalCost - payload.price);
      }
    }
  },
  clear: (state) => {
    state.items = [];
    state.totalCost = 0
  }
})

export const { add, sub } = cartSlice.actions;

export default cartSlice.reducer;