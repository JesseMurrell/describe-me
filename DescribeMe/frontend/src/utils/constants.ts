import Constants from 'expo-constants';

export const ENVIRONMENT = Constants.expoConfig?.extra?.environment || 'dev';
export const BACKEND_URL = ENVIRONMENT === 'prod'
  ? 'https://your-production-backend-endpoint' // Replace with the actual prod URL
  : 'http://localhost:5001'; // Dev/Local URL