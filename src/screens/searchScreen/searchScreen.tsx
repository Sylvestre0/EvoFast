import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'; 
import { styles } from './searchStyle';

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
    </View>
  );
}

