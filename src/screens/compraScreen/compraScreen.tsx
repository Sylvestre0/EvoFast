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

export default function EventPurchaseScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Botão de carrinho no canto superior direito */}
      <TouchableOpacity
        style={styles.cartIconTopRight}
        onPress={() => router.navigate('/router/cart')} // <- substitua por router.push('/router/cart') se usar expo-router
      >
        <Ionicons name="cart" size={28} color="#000" />
      </TouchableOpacity>

      {/* Imagem do evento */}
      <Image
        source={require('@/assets/images/ImageFesta.png')}
        style={styles.eventImage}
      />

      {/* Informações do evento */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>📍 Local:</Text>
        <Text style={styles.value}>Av. Paulista, 1234 - São Paulo, SP</Text>

        <Text style={styles.label}>🕒 Horário:</Text>
        <Text style={styles.value}>18 de Junho, 20:00h</Text>

        <Text style={styles.label}>💰 Valor:</Text>
        <Text style={styles.value}>R$ 79,90</Text>
      </View>

      {/* Botão "Adicionar ao Carrinho" */}
      <TouchableOpacity
        style={styles.cartButton}
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
