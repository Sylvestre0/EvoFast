import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView, // <--- Importar ScrollView para rolagem geral da tela
  View,       // <--- Manter View para containers gerais
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import {API} from '@/services/api'; // Ajuste o caminho da sua API

// Importe os componentes estilizados, incluindo o novo GridContainer
import {
  Container,
  SearchContainer,
  SearchIcon,
  SearchInput,
  VoiceButton,
  SectionTitle,
  EventCard,
  EventImage,
  EventTitle,
  EventDate,
  LoadingContainer,
  ErrorContainer,
  ErrorText,
  RetryText,
  NoEventsText,
  GridContainer, // <--- Importado
} from './searchStyle'; // Ajuste o caminho do seu arquivo de estilos

// Defina uma interface para o tipo de evento que você espera da API
interface Event {
  id: string;
  eventName: string;
  data_evento: string;
  imagem: string;
  // Adicione outras propriedades do evento conforme necessário, ex:
  // latitude?: string;
  // longitude?: string;
  // endereco_completo?: string;
}

export default function EventSearchScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [errorEvents, setErrorEvents] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      setErrorEvents(null);
      const response = await API.get('/ActiveEvents');

      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      } else if (response.data && Array.isArray(response.data.events)) {
        // Se a API retornar um objeto com uma propriedade 'events' que é um array
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } else {
        console.warn('API retornou dados em um formato inesperado:', response.data);
        setEvents([]);
        setFilteredEvents([]);
        Alert.alert('Aviso', 'Formato de dados de eventos inesperado da API.');
      }
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setErrorEvents('Não foi possível carregar os eventos.');
      Alert.alert('Erro', 'Não foi possível carregar os eventos. Verifique sua conexão.');
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = events.filter(event =>
        event.eventName.toLowerCase().includes(lowercasedQuery) ||
        event.data_evento.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchQuery, events]);

  // Componente de item do card
  const EventCardItem = ({ event }: { event: Event }) => (
    // Certifique-se de usar a 'key' aqui ao mapear para cada item
    <TouchableOpacity key={event.id} onPress={() => router.navigate('/router/compra')}>
      <EventCard>
        <EventImage source={{ uri: event.imagem }} />
        <EventTitle>{event.eventName}</EventTitle>
        <EventDate>{event.data_evento}</EventDate>
      </EventCard>
    </TouchableOpacity>
  );

  return (
    <Container>
      <SearchContainer>
        <SearchIcon name="search" size={20} color="#888" />
        <SearchInput
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <VoiceButton>
          <Ionicons name="mic" size={20} color="#888" />
        </VoiceButton>
      </SearchContainer>

      {loadingEvents ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Carregando eventos...</Text>
        </LoadingContainer>
      ) : errorEvents ? (
        <ErrorContainer>
          <ErrorText>{errorEvents}</ErrorText>
          <TouchableOpacity onPress={fetchEvents}>
            <RetryText>Tentar novamente</RetryText>
          </TouchableOpacity>
        </ErrorContainer>
      ) : (
        // Envolver o conteúdo principal em um ScrollView
        <ScrollView showsVerticalScrollIndicator={false}>
          <SectionTitle>📅 Eventos Próximos</SectionTitle>
          {filteredEvents.length > 0 ? (
            <GridContainer>
              {/* Usando .map() para renderizar os cards */}
              {filteredEvents.map(event => (
                <EventCardItem key={event.id} event={event} />
              ))}
            </GridContainer>
          ) : (
            <NoEventsText>Nenhum evento encontrado.</NoEventsText>
          )}

          <SectionTitle style={{ marginTop: 20 }}>🎯 Recomendados para Você</SectionTitle>
          {filteredEvents.length > 0 ? (
            <GridContainer>
              {/* Usando .map() para renderizar os cards recomendados */}
              {filteredEvents.slice(0, 5).map(event => ( // Limita a 5 itens
                <EventCardItem key={event.id} event={event} />
              ))}
            </GridContainer>
          ) : (
            <NoEventsText>Nenhum evento recomendado encontrado.</NoEventsText>
          )}
        </ScrollView>
      )}
    </Container>
  );
}