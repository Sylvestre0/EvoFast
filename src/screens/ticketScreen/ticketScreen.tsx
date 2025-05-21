import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { styles } from './ticketStyle';

const mockTickets = [
  {
    id: '1',
    eventName: 'Festival de Música',
    dateTime: '2025-05-20 19:00',
    location: 'Teatro Municipal',
    image: require('@/assets/images/ImageFesta.png'),
  },
  {
    id: '2',
    eventName: 'Feira de Tecnologia',
    dateTime: '2025-06-15 09:00',
    location: 'Centro de Convenções',
    image: require('@/assets/images/ImageFesta.png'),
  },
];

export default function TicketsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ingressos</Text>
        <TouchableOpacity onPress={() => router.push('/router/cart')}>
          <Ionicons name="cart-outline" size={28} color="#002764" />
        </TouchableOpacity>
      </View>

      {/* Lista de ingressos */}
      <FlatList
        data={mockTickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.ticketCard}>
            <Image source={item.image} style={styles.ticketImage} />
            <View style={styles.ticketInfo}>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.eventDetail}>🕒 {item.dateTime}</Text>
              <Text style={styles.eventDetail}>📍 {item.location}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

