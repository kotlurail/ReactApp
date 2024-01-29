import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from "./slices/authSlice";
import itemReducer from "./slices/itemSlice"
import cartReducer from "./slices/cartSlice"
import persistConfig from './persistConfig';

const rootReducer = combineReducers({
  auth: authReducer,
      item:itemReducer,
      cart:cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer
  });
  
  export let  persistor = persistStore(store);