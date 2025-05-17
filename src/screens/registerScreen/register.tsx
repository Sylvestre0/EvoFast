import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

export default function CadastroUsuarioScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (nome && usuario && email && senha) {
      try {
        const response = await axios.post('https://evofast-user.free.beeceptor.com', {
          nome,
          usuario,
          email,
          senha,
        });

        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
        setNome('');
        setUsuario('');
        setEmail('');
        setSenha('');
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
      }
    } else {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 10,
    padding: 5,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#002764',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#002764',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#00C851',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
