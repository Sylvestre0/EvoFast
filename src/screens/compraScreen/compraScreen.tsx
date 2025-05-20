import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { styles } from './compraStyle';

const { width } = Dimensions.get('window');

const mockEventData = {
  nome: 'Festa Universitária',
  local: 'Av. Paulista, 1234 - São Paulo, SP',
  horario: '18 de Junho, 20:00h',
  valor: 79.9,
  imagem: require('@/assets/images/ImageFesta.png'),
};

export default function EventPurchaseScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cartIconTopRight}
        onPress={() => router.push('/router/cart')}
      >
        <Ionicons name="cart" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.eventName}>{mockEventData.nome}</Text>

      <Image source={mockEventData.imagem} style={styles.eventImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>📍 Local:</Text>
        <Text style={styles.value}>{mockEventData.local}</Text>

        <Text style={styles.label}>🕒 Horário:</Text>
        <Text style={styles.value}>{mockEventData.horario}</Text>

        <Text style={styles.label}>💰 Valor:</Text>
        <Text style={styles.value}>R$ {mockEventData.valor.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => alert('Item adicionado ao carrinho!')}
      >
        <Ionicons name="cart" size={32} color="#fff" style={styles.cartIcon} />
        <Text style={styles.cartText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

