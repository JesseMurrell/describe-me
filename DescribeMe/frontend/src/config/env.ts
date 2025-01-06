import Constants from 'expo-constants';

export const ENVIRONMENT = Constants.expoConfig?.extra?.ENVIRONMENT || 'prod';
export const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL;
export const ADMOB_INTERSTITIAL_AD_UNIT_ID =
  Constants.expoConfig?.extra?.ADMOB_INTERSTITIAL_AD_UNIT_ID || '';