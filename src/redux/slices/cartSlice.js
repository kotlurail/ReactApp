import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
    addToCart: {
      loading: false,
      error: false,
      success: false,
      message: null,
    }, fetchCartItemsStatus: {
        loading: false,
        error: false,
        success: false,
        message: [],
      },
  };

  export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.post("/cart/additemtouser", values);
        console.log(data,"data at 32")
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
//   export const deleteItem = createAsyncThunk(
//     "items/deleteItem",
//     async (values, { rejectWithValue }) => {
//       try {
//         const { data } = await axios.post("/item/deleteItem", values);
//         return data;
//       } catch (err) {
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );
  

  export const fetchCartItems = createAsyncThunk(
    "/cart/fetchCartItems",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("/cart/fetchCartItems");
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      clearFetchItemOfCart: (state) => {
        state.addToCart.loading = false;
        state.addToCart.error = false;
        state.addToCart.success = false;
        state.addToCart.message = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(addItemToCart.pending, (state) => {
          state.addToCart.loading = true;
          state.addToCart.error = false;
          state.addToCart.success = false;
          state.addToCart.message = "Adding Item...";
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
          state.addToCart.loading = false;
          state.addToCart.error = false;
          state.addToCart.success = action.payload.success;
          state.addToCart.message = action.payload.message
        })
        .addCase(addItemToCart.rejected, (state, action) => {
          state.addToCart.loading = false;
          state.addToCart.error = true;
          state.addToCart.success = false;
          state.addToCart.message = action.payload.message;
        })
        .addCase(fetchCartItems.pending, (state) => {
            state.fetchCartItemsStatus.loading = true;
            state.fetchCartItemsStatus.error = false;
            state.fetchCartItemsStatus.success = false;
            state.fetchCartItemsStatus.message = [];
          })
          .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.fetchCartItemsStatus.loading = false;
            state.fetchCartItemsStatus.error = false;
            state.fetchCartItemsStatus.success = action.payload.status;
            state.fetchCartItemsStatus.message = action.payload.data
          })
          .addCase(fetchCartItems.rejected, (state, action) => {
            state.fetchCartItemsStatus.loading = false;
            state.fetchCartItemsStatus.error = true;
            state.fetchCartItemsStatus.success = false;
            state.fetchCartItemsStatus.message = [];
          })   
    },
  });
  
  export const {
    clearFetchItemOfCart
  } = cartSlice.actions;

  export default cartSlice.reducer;