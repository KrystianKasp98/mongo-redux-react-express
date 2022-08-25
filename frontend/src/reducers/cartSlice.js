import { createSlice } from "@reduxjs/toolkit";
import { roundTotalCost } from "../utils";

const initialState = {
  items: [],
  totalCost: 0,
};

const findItemIndex = (state, payload) =>
  state.items.findIndex((item) => item._id === payload._id);

const removeItemFromItems = (state, payload) => state.items.filter((item) => item._id !== payload._id); 

const iterateValueOfItem = (item) => ({ ...item, value: item.value + 1 });

const decrementValueOfItem = (item) => ({ ...item, value: item.value - 1 });

const addNewItem = (payload) => ({ ...payload, value: 1 });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { payload } = action;
      const index = findItemIndex(state, payload);

      state.items =
        index === -1
          ? [...state.items, addNewItem(payload)]
          : state.items.map((item) =>
              item._id === payload._id ? iterateValueOfItem(item) : item
            );

      state.totalCost = roundTotalCost(state.totalCost + payload.price);
    },
    sub: (state, action) => {
      const { payload } = action;
      const index = findItemIndex(state, payload);

      if (index !== -1) {
        state.items = state.items.map((item) =>
          item._id === payload._id ? decrementValueOfItem(item) : item
        );

        if (state.items[index].value === 0) {
          state.items = removeItemFromItems(state, payload);
        }
        state.totalCost = roundTotalCost(state.totalCost - payload.price);
      }
    },
    removeItem: (state, action) => {
      const { payload } = action;
      const index = findItemIndex(state, payload);

      if (index !== -1) {
        const itemTotalCost = roundTotalCost(
          state.items[index].price * state.items[index].value
        );
        state.items = removeItemFromItems(state, payload);
        state.totalCost = roundTotalCost(state.totalCost - itemTotalCost);
      }
    },
    clearAll: (state) => {
      state.items = [];
      state.totalCost = 0;
    },
  },
});

export const { add, sub, removeItem, clearAll } = cartSlice.actions;

export default cartSlice.reducer;
