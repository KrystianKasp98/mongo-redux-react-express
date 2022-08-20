import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCost : 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const index = state.items.findIndex(item => item._id === action.payload._id);
      state.items = index === -1 ? [...state.items, { ...action.payload, value: 1 }] : state.items.map(item => {
        if (item._id === action.payload._id) {
          item.value += 1;
        }
        return item
      })
      state.totalCost = Math.round((state.totalCost+action.payload.price)*100)/100;
    },
    sub: (state, action) => {
      const index = state.items.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.items = state.items.map(item => {
          if (item._id === action.payload._id) {
            item.value -= 1;
          }
          return item;
        })
        if (state.items[index].value === 0) {
          state.items = state.items.filter(item => item._id !== action.payload._id)
        }
        state.totalCost =
          Math.round((state.totalCost - action.payload.price) * 100) / 100;
      }
    }
  }
})

export const { add, sub } = cartSlice.actions;

export default cartSlice.reducer;