import Constants from 'expo-constants';

export const ENVIRONMENT = Constants.expoConfig?.extra?.ENVIRONMENT || 'dev';

export const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL;

console.log('ENVIRONMENT:', ENVIRONMENT);
console.log('BACKEND_URL:', BACKEND_URL);