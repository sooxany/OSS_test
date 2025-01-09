import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { register } from '../utils/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, password);
      Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
      navigation.replace('Login'); // 로그인 화면으로 이동
    } catch (error) {
      Alert.alert('회원가입 실패', error.message || '오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <InputField placeholder="Username" value={username} onChangeText={setUsername} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="회원가입" onPress={handleRegister} />
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
