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

// 회원가입 API
export const register = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.log('회원가입 에러:', error.response?.data || error.message);
      throw error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
    }
  };