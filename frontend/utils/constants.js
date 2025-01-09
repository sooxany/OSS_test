import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.apiUrl || Constants.manifest2?.extra?.apiUrl || "http://172.31.74.180:8000";
