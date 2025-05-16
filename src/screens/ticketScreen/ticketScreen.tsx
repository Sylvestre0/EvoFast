import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import BottomNavigation from '@/components/bottom/BottomNavigation';

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

      {/* Navegação inferior */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
  },
  ticketImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: 'cover',
  },
  ticketInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  eventDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
