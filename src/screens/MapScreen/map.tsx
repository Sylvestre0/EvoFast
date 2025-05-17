import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomNavigation from '@/components/bottom/BottomNavigation';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização');
        return;
      }

      // Captura a localização atual
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView style={styles.map} initialRegion={userLocation} showsUserLocation>
          {/* Marcador do evento (exemplo fixo) */}
          <Marker
            coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
            title="Evento"
            description="Local do evento"
          >
            <View style={styles.markerContainer}>
              <Image
                source={require('@/assets/images/Logo.png')}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}

      {/* Navegação inferior fixa */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  markerContainer: {
    width: 79,
    height: 79,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  markerImage: {
    width: 79,
    height: 79,
    resizeMode: 'cover',
  },
});
