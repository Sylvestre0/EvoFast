import React, { useRef } from 'react';
import { Logo } from "@/components/Logo/Logo.style";
import Password from "@/components/Inputs/PassWord";
import Email from "@/components/Inputs/Email";
import { Login, Personbottom } from "@/components/bottom/bottomInput";
import { WaterMask } from "@/components/Marca_D'agua/cooporation";
import { router } from 'expo-router';
import { Text, Alert } from 'react-native';
import {API} from '@/services/api';
import { Container, ForgotPassword, ForgotText, RegisterButton, RegisterText } from './login.styled';

export default function   LoginScreen() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    const DevMode = true
    if (DevMode == true) {
      router.navigate('/router/home');
      return;
    }

    const email = emailRef.current?.getValue();
    const password = passwordRef.current?.getValue();

    if (!email?.trim() || !password?.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await API.post('/login', { email, password });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Login realizado!");
        router.navigate('/router/(Navigations)/home');
      }
    } catch (error) {
      const status = error.response?.status;
      const mensagem = error.response?.data?.error; 
      Alert.alert(`Erro: ${mensagem} status-Code: ${status}`);
    }
  };

  return (
    <Container>
      <Logo />
      <Email ref={emailRef} />
      <Password ref={passwordRef} />

      <ForgotPassword onPress={() => router.navigate('/router/forgot-password')}>
        <ForgotText>Esqueceu sua senha?</ForgotText>
      </ForgotPassword>

      <Personbottom onPress={handleLogin}>
        <Login>Login</Login>
      </Personbottom>

      <Text> ou </Text>

      <RegisterButton onPress={() => router.navigate('/router/register')}>
        <RegisterText>Registre-se</RegisterText>
      </RegisterButton>

      <WaterMask>©Sylvester Coop</WaterMask>
    </Container>
  );
}
