import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
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
              source={require('@/assets/images/Logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>
      </MapView>

     
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
  width: 79,
  height: 79,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eee', // opcional
},

markerImage: {
  width: 79,
  height: 79,
  resizeMode: 'cover',
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
