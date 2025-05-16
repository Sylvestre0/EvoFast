import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavigation from '@/components/bottom/BottomNavigation';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  // Exemplo de coordenadas do evento
  const eventLocation = {
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>

      <MapView style={styles.map} initialRegion={eventLocation}>
        <Marker coordinate={eventLocation}>
          <View style={styles.markerContainer}>
            <Image
              source={require('@/assets/images/ImageFesta.avif')}
              style={styles.markerImage}
            />
            <View style={styles.pin} />
          </View>
        </Marker>
      </MapView>

      {/* Espaço para integração com IoT */}
      <View style={styles.iotSection}>
        <Text style={styles.subtitle}>Status do Dispositivo IoT</Text>
        <Text style={styles.iotStatus}>Conectado ⚡</Text>
      </View>

      {/* Navegação inferior fixa */}
      <View >
        <BottomNavigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    color: '#002764',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerImage: {
    width: 79,
    height: 79,
    borderRadius: 79 / 2,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: -10,
    backgroundColor: '#eee',
  },
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#fff',
  },
  iotSection: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002764',
    marginBottom: 8,
  },
  iotStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: '600',
  },
  
  },
);
