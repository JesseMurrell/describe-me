import axios from 'axios';
import { BACKEND_URL } from '@/config/env';

console.log('Using BACKEND_URL:', BACKEND_URL); // Debugging log

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestCaption = async (formData: FormData) => {
  const endpoint = '/caption'; // Explicitly define the caption endpoint
  console.log('Making request to:', `${BACKEND_URL}${endpoint}`);
  const response = await api.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export default api;