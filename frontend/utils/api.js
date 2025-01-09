import axios from 'axios';
import { API_URL } from './constants'; // 상수에서 API URL 가져오기

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
  }
};
