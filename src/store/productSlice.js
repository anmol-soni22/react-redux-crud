import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define initial state
const initialState = {
  products: [],
};

// Create product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action to set products
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // Action to add a product
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: uuidv4() };
      state.products.push(newProduct);
    },
    // Action to remove a product
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    // Action to update a product
    updateProduct: (state, action) => {
      console.log(action.payload)
      console.log(state.products);
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
  },
});

// Export actions and reducer
export const { setProducts, addProduct, removeProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
