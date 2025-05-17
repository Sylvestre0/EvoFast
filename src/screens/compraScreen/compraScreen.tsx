import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Simulação de dados de evento (pode ser substituído por dados da API futuramente)
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
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Botão de carrinho */}
      <TouchableOpacity
        style={styles.cartIconTopRight}
        onPress={() => router.push('/router/cart')}
      >
        <Ionicons name="cart" size={28} color="#000" />
      </TouchableOpacity>

      {/* Nome do Evento */}
      <Text style={styles.eventName}>{mockEventData.nome}</Text>

      {/* Imagem do evento */}
      <Image source={mockEventData.imagem} style={styles.eventImage} />

      {/* Informações do evento */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>📍 Local:</Text>
        <Text style={styles.value}>{mockEventData.local}</Text>

        <Text style={styles.label}>🕒 Horário:</Text>
        <Text style={styles.value}>{mockEventData.horario}</Text>

        <Text style={styles.label}>💰 Valor:</Text>
        <Text style={styles.value}>R$ {mockEventData.valor.toFixed(2)}</Text>
      </View>

      {/* Botão "Adicionar ao Carrinho" */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  cartIconTopRight: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
    textAlign: 'center',
    justifyContent:'center',
    marginBottom: 12,
  },
  eventImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002764',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  cartButton: {
    width: 186,
    height: 86,
    backgroundColor: '#2ECC71',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  cartIcon: {
    marginRight: 8,
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
