import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8000';

export const login = async (username, password) => {
  const response = await axios.post(`${apiUrl}/api/auth/login`, {
    username,
    password,
  });
  return response.data;
};
