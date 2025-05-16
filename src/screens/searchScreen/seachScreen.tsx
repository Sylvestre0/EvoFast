import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'; // ✅ Import necessário
import BottomNavigation from '@/components/bottom/BottomNavigation';

const mockEvents = [
  {
    id: '1',
    title: 'Festival de Música',
    date: '2025-05-20',
    image: require('@/assets/images/ImageFesta.png'),
  },
  {
    id: '2',
    title: 'Feira de Tecnologia',
    date: '2025-05-22',
    image: require('@/assets/images/ImageFesta.png'),
  },
];

const recommendedEvents = [
  {
    id: '3',
    title: 'Stand Up Comedy',
    date: '2025-06-01',
    image: require('@/assets/images/ImageFesta.png'),
  },
  {
    id: '4',
    title: 'Teatro Experimental',
    date: '2025-06-05',
    image: require('@/assets/images/ImageFesta.png'),  },
];

export default function EventSearchScreen() {
  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar eventos..."
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.voiceButton}>
          <Ionicons name="mic" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Eventos Próximos */}
      <Text style={styles.sectionTitle}>📅 Eventos Próximos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {mockEvents.map(event => (
          <TouchableOpacity key={event.id} onPress={() => router.navigate('/router/compra')}>
            <View style={styles.eventCard}>
              <Image source={event.image} style={styles.eventImage} />
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Eventos Recomendados */}
      <Text style={styles.sectionTitle}>🎯 Recomendados para Você</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {recommendedEvents.map(event => (
          <TouchableOpacity key={event.id} onPress={() => router.navigate('/router/compra')}>
            <View style={styles.eventCard}>
              <Image source={event.image} style={styles.eventImage} />
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  voiceButton: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#002764',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  eventCard: {
    width: 150,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  eventImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    marginHorizontal: 8,
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});
