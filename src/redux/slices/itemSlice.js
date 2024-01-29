import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
  addItemObj: {
    loading: false,
    error: false,
    success: false,
    message: [],
  },
  deleteItem: {
    loading: false,
    error: false,
    success: false,
    message: [],
  },
  fetchItems: {
    loading: false,
    error: false,
    success: false,
    message: [],
  },
  searchItems: {
    loading: false,
    error: false,
    success: false,
    message: [],
  },
};

export const addItem = createAsyncThunk(
  "items/addItem",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/item/addItem", values);
      console.log(data, "data at 32");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/item/deleteItem", values);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllItems = createAsyncThunk(
  "/item/fetchItems",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/item/fetchItems");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchAllItems = createAsyncThunk(
  "/item/searchitem",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/item/searchitem?q=${values}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    clearItem: (state) => {
      state.addItemObj.loading = false;
      state.addItemObj.error = false;
      state.addItemObj.success = false;
      state.addItemObj.message = [];
    },
    clearFetchItems: (state) => {
      state.fetchItems.loading = false;
      state.fetchItems.error = false;
      state.fetchItems.success = false;
      state.fetchItems.message = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.addItemObj.loading = true;
        state.addItemObj.error = false;
        state.addItemObj.success = false;
        state.addItemObj.message = "Adding Item...";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.addItemObj.loading = false;
        state.addItemObj.error = false;
        state.addItemObj.success = true;
        state.addItemObj.message = action.payload.message;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.addItemObj.loading = false;
        state.addItemObj.error = true;
        state.addItemObj.success = false;
        state.addItemObj.message = action.payload.message;
      })
      .addCase(fetchAllItems.pending, (state) => {
        state.fetchItems.loading = true;
        state.fetchItems.error = false;
        state.fetchItems.success = false;
        state.fetchItems.message = [];
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.fetchItems.loading = false;
        state.fetchItems.error = false;
        state.fetchItems.success = action.payload.status;
        state.fetchItems.message = action.payload.data;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.fetchItems.loading = false;
        state.fetchItems.error = true;
        state.fetchItems.success = action.payload.status;
        state.fetchItems.message = "Failed to get Items";
      })
      .addCase(searchAllItems.pending, (state) => {
        state.searchItems.loading = true;
        state.searchItems.error = false;
        state.searchItems.success = false;
        state.searchItems.message = [];
      })
      .addCase(searchAllItems.fulfilled, (state, action) => {
        state.searchItems.loading = false;
        state.searchItems.error = false;
        state.searchItems.success = action.payload.status;
        state.searchItems.message = action.payload.data;
      })
      .addCase(searchAllItems.rejected, (state, action) => {
        state.searchItems.loading = false;
        state.searchItems.error = true;
        state.searchItems.success = action.payload.status;
        state.searchItems.message = "Failed to search Items";
      });
  },
});

export const { clearItem, clearFetchItems } = itemSlice.actions;

export default itemSlice.reducer;
