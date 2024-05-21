import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
