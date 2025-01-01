import Constants from 'expo-constants';

export const ENVIRONMENT = Constants.expoConfig?.extra?.ENVIRONMENT || 'prod';

export const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL;