import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import InputField from '../components/InputField'; // InputField 컴포넌트
import Button from '../components/Button'; // Button 컴포넌트
import { login } from '../utils/api'; // login 함수 호출

console.log(Button);
console.log(InputField);
console.log('InputField:', InputField);

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await login(id, password); // utils/api.js의 login 함수 사용
      Alert.alert('로그인 성공', '토큰: ' + response.token.substring(0, 10) + '...');
      router.replace('/main'); // 메인 화면으로 이동
    } catch (error) {
      Alert.alert('로그인 실패', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <InputField
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
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
});
