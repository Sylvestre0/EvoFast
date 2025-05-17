import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AddCardScreen() {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [dateCard, setDateCard] = useState('');
  const [nameCard, setNameCard] = useState('');

  const handleAddCard = () => {
    if (!cardNumber || !cvc || !dateCard || !nameCard) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    Alert.alert('Sucesso', 'Cartão adicionado com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>ADICIONAR O NOVO CARTÃO</Text>

      {/* Imagem do cartão */}
      <Image
        source={require('@/assets/images/card.png')}
        style={styles.cardImage}
        resizeMode="contain"
      />

      {/* Formulário */}
      <TextInput
        placeholder="Card Number"
        style={styles.input}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="CVC"
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
          value={cvc}
          onChangeText={setCvc}
        />
        <TextInput
          placeholder="Date Card"
          style={[styles.input, styles.halfInput]}
          value={dateCard}
          onChangeText={setDateCard}
        />
      </View>

      <TextInput
        placeholder="Name Card"
        style={styles.input}
        value={nameCard}
        onChangeText={setNameCard}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.button} 
            onPress={() => router.navigate('/router/confirmPay')}>
      
        <Text style={styles.buttonText}>Add New Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  cardImage: {
    width: width - 40,
    height: 180,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#00C851',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
