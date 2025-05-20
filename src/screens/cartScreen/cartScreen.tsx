import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { styles } from './cartStyle';

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
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Carrinho</Text>

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

