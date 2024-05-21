// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  // Add other reducers here if you have more slices
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
