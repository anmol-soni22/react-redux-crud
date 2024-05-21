import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    sessionStorage.setItem('token',response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshApi = async () => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

