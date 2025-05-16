import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; // import do ícone de voltar

const mockCartItems = [
  {
    id: '1',
    eventName: 'Festival de Música',
    quantity: 2,
    price: 50.0,
    image: require('@/assets/images/ImageFesta.png'),
  },
  {
    id: '2',
    eventName: 'Feira de Tecnologia',
    quantity: 1,
    price: 70.0,
    image: require('@/assets/images/ImageFesta.png'),
  },
];

export default function CartScreen() {
  const total = mockCartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Carrinho</Text>

      {/* Lista de itens do carrinho */}
      <FlatList
        data={mockCartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.quantity}>🎟️ {item.quantity} ingresso(s)</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)} cada</Text>
            </View>
          </View>
        )}
      />

      {/* Total e botão de comprar */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => router.navigate('/router/payments')}        >
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom:10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
    marginBottom: 16,
    marginTop: 40, // espaço extra por causa do botão
    alignSelf: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 12,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#00C851',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
