import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { login } from '../utils/api';

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await login(id, password);
      Alert.alert('로그인 성공', `토큰: ${response.token.substring(0, 10)}...`);
      navigation.replace('mainscreen'); 
    } catch (error) {
      Alert.alert('로그인 실패', error.message || '오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <InputField placeholder="ID" value={id} onChangeText={setId} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={() => navigation.navigate('Register')} />
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
