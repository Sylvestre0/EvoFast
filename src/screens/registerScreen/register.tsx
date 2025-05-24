import React, { useRef } from 'react';
import { Logo } from "@/components/Logo/Logo.style";
import Password from "@/components/Inputs/PassWord";
import Email from "@/components/Inputs/Email";
import Name from "@/components/Inputs/Name"; 
import { Login, Personbottom } from "@/components/bottom/bottomInput";
import { WaterMask } from "@/components/Marca_D'agua/cooporation";
import { router } from 'expo-router';
import { Text, Alert, TouchableOpacity } from 'react-native';
import {API} from '@/services/api';
import { Container, RegisterButton, RegisterText, BackButton, BackText } from './registerStyle'; // Importar novos estilos

export default function RegisterScreen() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegister = async () => {
    const name = nameRef.current?.getValue();
    const email = emailRef.current?.getValue();
    const password = passwordRef.current?.getValue();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      const response = await API.post('/register', {
        name: name,
        email,
        password: password,
        googleId: null, 
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        router.navigate('/router/home');
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
      <Name ref={nameRef} />
      <Email ref={emailRef} />
      <Password ref={passwordRef} />

      <Personbottom onPress={handleRegister}>
        <Login>Cadastrar</Login>
      </Personbottom>

      <Text> ou </Text>

      <RegisterButton onPress={() => router.navigate('/router/login')}>
        <RegisterText>Já tem uma conta? Faça login</RegisterText>
      </RegisterButton>

      <WaterMask>©Sylvester Coop</WaterMask>
    </Container>
  );
}