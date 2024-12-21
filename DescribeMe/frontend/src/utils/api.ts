import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = Constants.expoConfig?.extra?.ngrokUrl || "http://localhost:5001";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadImage = async (formData: FormData) => {
  const response = await api.post('/caption', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export default api;