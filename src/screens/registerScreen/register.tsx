import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import api from '../../services/api';
import { styles } from './registerStyle';

export default function CadastroUsuarioScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
  if (!nome || !usuario || !email || !senha) {
    Alert.alert('Preencha todos os campos');
    return;
  }

  if (senha.length < 8) {
    Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  try {
    const response = await api.post('/usuarios', {
      nome,
      usuario,
      email,
      senha,
    });

    Alert.alert('Usuário cadastrado com sucesso!');
    setNome('');
    setUsuario('');
    setEmail('');
    setSenha('');
  } catch (error) {
    if (error.response?.status === 409) {
      Alert.alert('Erro', 'Usuário ou e-mail já cadastrado.');
    } else {
      Alert.alert('Erro ao cadastrar. Verifique a API.');
    }
    console.error(error);
  }
};



  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#002764" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Cadastro de Usuário</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome completo"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário:</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
          placeholder="Seu nome de usuário"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Seu e-mail"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Sua senha"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}


