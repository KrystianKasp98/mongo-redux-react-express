import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MongoDbApi from "../api/mongoDbApi";

const initialState = {
  items: [],
  status: 'idle'
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => await MongoDbApi.getItems()
)

export const changeItemCount = createAsyncThunk(
  'items/reduceItemCount',
  async ({item, count}) => {
    const result = await MongoDbApi.updateItemCount(item, count);
    if (result) {
      item.count = count
      return item;
    }
    else {
      return result;
    }
  }
)

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
  }
});

export default itemsSlice.reducer;