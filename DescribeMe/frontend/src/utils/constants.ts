import Constants from 'expo-constants';

export const ENVIRONMENT = Constants.expoConfig?.extra?.environment || 'prod';
export const BACKEND_URL = ENVIRONMENT === 'prod'
  ? 'https://e222d6oyll.execute-api.eu-west-2.amazonaws.com' 
  : 'http://localhost:5001'; 