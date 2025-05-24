import React, { useEffect, useState } from 'react';
import { Text, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styled from 'styled-components/native';
import {API} from '@/services/api';
import { Container, LoadingContainer, LoadingText, Map } from './mapStyle';


export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoadingEvents(true);
        setErrorEvents(null);
        const response = await API.get('/ActiveEvents');
        if (response.data && Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        setErrorEvents('Não foi possível carregar os eventos.');
      } finally {
        setLoadingEvents(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <Container>
      {userLocation ? (
        <Map initialRegion={userLocation} showsUserLocation>
          {events.map((event) => (
            <Marker
              key={event.id || `${event.latitude}-${event.longitude}`}
              coordinate={{
                latitude: parseFloat(event.latitude),
                longitude: parseFloat(event.longitude),
              }}
              title={`${event.eventname}`}
              description={`${event.endereco_completo}`}
              image={{ uri: event.imagem }} 
            />
          ))}
        </Map>
      ) : (
        <LoadingContainer>
          <LoadingText>Carregando mapa...</LoadingText>
        </LoadingContainer>
      )}
    </Container>
  );
}