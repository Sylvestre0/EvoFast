import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from "@/components/Logo/Logo.style";
import Password from "@/components/Inputs/PassWord";
import Email from "@/components/Inputs/Email";
import { Login, Personbottom } from "@/components/bottom/bottomInput";
import { WaterMask } from "@/components/Marca_D'agua/cooporation";
import { router } from 'expo-router';
import { Text } from 'react-native';

// Estilo do container com gradiente
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

// Botão de registrar-se
const RegisterButton = styled.TouchableOpacity`
  background-color:rgba(23, 212, 6, 0.81);
  padding: 12px 24px;
  border-radius: 10px;
  margin-top: 16px;
`;

const RegisterText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

// Link "Esqueceu sua senha?"
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

  return (
    <Container>
      <Logo />
      <Email />
      <Password />
      <ForgotPassword onPress={() => router.navigate('/router/forgot-password')}>
        <ForgotText>Esqueceu sua senha?</ForgotText>
      </ForgotPassword>
      <Personbottom onPress={() => router.navigate('/router/home')} >
        <Login>Login</Login>
      </Personbottom>
      <Text> ou </Text>
      {/* Botão que leva para a tela de registro */}
      <RegisterButton onPress={() => router.navigate('/router/register')}>
        <RegisterText>Registre-se</RegisterText>
      </RegisterButton>

      {/* Link para recuperação de senha */}
      

      <WaterMask>©Sylvester Coop</WaterMask>
    </Container>
  );
}
