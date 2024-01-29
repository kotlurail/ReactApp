import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
    token: null,
    user: {},
    name:"",
    email:"",
    loggedIn: false,
    register: {
      loading: false,
      error: false,
      success: false,
      message: null,
    },
    login: {
      loading: false,
      error: false,
      success: false,
      message: null,
    },
    logout: {
      loading: false,
      error: false,
      success: false,
      message: null,
    },
  };

  export const register = createAsyncThunk(
    "auth/register",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.post("/auth/signup", values);
        console.log(data,"data at 32")
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const login = createAsyncThunk(
    "auth/login",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.post("/auth/login", values);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  export const fetchuserDetails = createAsyncThunk(
    "/user/fetchUserDetails",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("/user/fetchUserDetails");
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("/auth/logout");
        
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      clearRegister: (state) => {
        state.register.loading = false;
        state.register.error = false;
        state.register.success = false;
        state.register.message = null;
      },
      clearLogin: (state) => {
        state.login.loading = false;
        state.login.error = false;
        state.login.success = false;
        state.login.message = null;
      }, 
      clearLogout: (state) => {
        state.logout.loading = false;
        state.logout.error = false;
        state.logout.success = false;
        state.logout.message = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.register.loading = true;
          state.register.error = false;
          state.register.success = false;
          state.register.message = "Signing up...";
        })
        .addCase(register.fulfilled, (state, action) => {
          state.register.loading = false;
          state.register.error = false;
          state.register.success = true;
          state.user = action.payload.user;
          state.register.message = action.payload.message
        })
        .addCase(register.rejected, (state, action) => {
          state.register.loading = false;
          state.register.error = true;
          state.register.success = false;
          state.register.message = "Rejected";
        })
        .addCase(login.pending, (state) => {
          state.login.loading = true;
          state.login.error = false;
          state.login.success = false;
          state.login.message = "Signing in...";
        })
        .addCase(login.fulfilled, (state, action) => {
          state.login.loading = false;
          state.login.error = false;
          state.login.success = true;
          state.user = action.payload.id;
          state.loggedIn = true;
          state.login.message = action.payload.role;
        })
        .addCase(login.rejected, (state, action) => {
          state.login.loading = false;
          state.login.error = true;
          state.login.success = false;
          state.login.message = "Failed zTo load";
        })
        .addCase(logout.pending, (state) => {
          state.logout.loading = true;
          state.logout.error = false;
          state.logout.success = false;
          state.logout.message = "Logging out...";
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.logout.loading = false;
          state.logout.error = false;
          state.logout.success = true;
          state.user = {};
          state.token = null;
          state.loggedIn = false;
          state.name="";
          state.email="";
          state.logout.message = action.payload.status;
        })
        .addCase(logout.rejected, (state, action) => {
          state.logout.loading = false;
          state.logout.error = true;
          state.logout.success = false;
          state.logout.message = "loggedOutFailed";
        })
        .addCase(fetchuserDetails.pending,(state)=>{
          state.name="";
          state.email=""
        }).addCase(fetchuserDetails.fulfilled,(state,action)=>{
          state.name=action.payload.name;;
          state.email=action.payload.Email;
        }).addCase(fetchuserDetails.rejected,(state,action)=>{
          state.name="";
          state.email="";
        })
    },
  });
  
  export const {
    clearRegister,
    clearLogin,clearLogout
  } = authSlice.actions;

  export default authSlice.reducer;