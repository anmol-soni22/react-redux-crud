import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchProductsApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsInfo = async (prodId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${prodId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProductApi = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductApi = async (productId, updatedProductData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, updatedProductData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
