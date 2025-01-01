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
  const endpoint = '/caption';
  console.log(`[requestCaption] Making request to: ${BACKEND_URL}${endpoint}`);

  try {
    const response = await api.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    
    console.log("[requestCaption] Response status:", response.status);
    console.log("[requestCaption] Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("[requestCaption] Axios error response data:", error.response.data);
      console.error("[requestCaption] Axios error response status:", error.response.status);
    } else {
      console.error("[requestCaption] Error:", error.message || error);
    }
    throw error;
  }
};

export default api;