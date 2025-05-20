import React, { useState } from 'react';
import {
  View,
  Text,
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
import { styles } from './cardStyle';

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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>ADICIONAR O NOVO CARTÃO</Text>

      <Image
        source={require('@/assets/images/card.png')}
        style={styles.cardImage}
        resizeMode="contain"
      />

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

      <TouchableOpacity style={styles.button} 
            onPress={() => router.navigate('/router/confirmPay')}>
      
        <Text style={styles.buttonText}>Add New Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

