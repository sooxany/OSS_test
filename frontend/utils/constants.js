import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.apiUrl || Constants.manifest2?.extra?.apiUrl || "http://192.168.0.24:8000";
