import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from "@/components/Logo/Logo.style";
import Password from "@/components/Inputs/PassWord";
import Email from "@/components/Inputs/Email";
import { Login, Personbottom } from "@/components/bottom/bottomInput";
import { WaterMask } from "@/components/Marca_D'agua/cooporation";
import { router } from 'expo-router';
import { Text, Alert } from 'react-native';
import api from '@/services/api';

const Container = styled(LinearGradient).attrs({
  colors: ['#4840dd', '#8080f2', '#00d4ff'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: rgba(23, 212, 6, 0.81);
  padding: 12px 24px;
  border-radius: 10px;
  margin-top: 16px;
`;

const RegisterText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const ForgotPassword = styled.TouchableOpacity`
  margin-top: -20px;
  margin-bottom: 10px;
`;

const ForgotText = styled.Text`
  color: white;
  font-size: 14px;
  text-decoration: underline;
`;

export default function LoginScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    const email = emailRef.current?.getValue();
    const senha = passwordRef.current?.getValue();

    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/login', { email, senha });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Login realizado!");
        router.navigate('/router/home');
      }
    } catch (error) {
      Alert.alert("Erro no login", "E-mail ou senha incorretos.");
      console.error(error);
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
