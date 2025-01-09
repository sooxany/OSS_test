import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Button from './Button'; // Button 컴포넌트

const NavigateButton = ({ title, targetScreen }) => {
  const navigation = useNavigation();
  return (
    <Button
      title={title}
      onPress={() => navigation.navigate(targetScreen)} // targetScreen으로 이동
    />
  );
};

export default NavigateButton;
