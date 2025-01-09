// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants'; // expo-constants import

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // 환경 변수 가져오기
  const apiUrl = Constants.expoConfig?.extra?.apiUrl || Constants.manifest2?.extra?.apiUrl;

  if (!apiUrl) {
    Alert.alert('Error', 'API URL is not defined.');
    return;
  }

  console.log(apiUrl);  // http://localhost:8000 (요기 수정함)

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username: id,
        password: password,
      });
      Alert.alert('로그인 성공', '로그인 성공, 토큰: ' + response.data.token.substring(0, 10) + '...');  // 토큰의 일부만 표시
      router.replace('/main'); // 로그인 성공 시 메인 화면으로 이동 (뒤로 가기 방지)
    } catch (error) {
      const errorMessage = error.response?.data || error.message || '오류가 발생했습니다.';
      Alert.alert('로그인 실패', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.signupButton}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  signupButton: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
