import React from "react";
import {
  Platform,
  TouchableOpacity,
  Alert,
  FlatList,
  Text,
  View,
  ScrollView, 
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import { useEventForm } from '@/screens/newEventScreen/script';

import {
  BackButton,
  BackButtonText,
  Checkbox,
  CheckboxContainer,
  CheckboxLabel,
  Container, 
  EventImage,
  ImagePickerContainer,
  ImagePlaceholderText,
  Input,
  SubmitButton,
  SubmitButtonText,
  SuggestionItem,
  SuggestionText,
} from "./newEventStyle";
import { router } from "expo-router";

export default function CreateEventScreen() {
  const {
    imageUri, eventName, eventDate, showDatePicker, selectedDateObject,
    countryCode, countryName, showCountryPicker, addressInput,
    addressSuggestions, isFree, eventPrice,
    setEventName, setShowDatePicker,
    setShowCountryPicker, setIsFree, setEventPrice,
    showImageOptions, handleDateChange, onSelectCountry,
    handleAddressInputChange, handleAddressSelection, handleSubmit, isSubmitting
  } = useEventForm();

  return (
    <Container> 
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} 
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled" 
        >

          <BackButton onPress={() => router.back()}>
            <BackButtonText>← Voltar</BackButtonText>
          </BackButton>

          <ImagePickerContainer onPress={showImageOptions}>
            {imageUri ? (
              <EventImage source={{ uri: imageUri }} />
            ) : (
              <ImagePlaceholderText>Toque para adicionar uma imagem</ImagePlaceholderText>
            )}
          </ImagePickerContainer>

          <Input
            placeholder="Nome do Evento"
            value={eventName}
            onChangeText={setEventName}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Input
              placeholder="Data do Evento (DD/MM/AAAA)"
              value={eventDate}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedDateObject}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
            <Input
              placeholder="País"
              value={countryName || "Selecione o País"}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          <CountryPicker
            {...{
              countryCode,
              onSelect: onSelectCountry,
              withFilter: true,
              withFlag: true,
              withEmoji: false,
              withCountryNameButton: true,
              onClose: () => setShowCountryPicker(false),
              visible: showCountryPicker,
            }}
          />

          <Input
            placeholder="Endereço Completo (Rua, Número, Cidade, CEP)"
            value={addressInput}
            onChangeText={handleAddressInputChange}
          />
          {addressSuggestions.length > 0 && (
            <FlatList
              data={addressSuggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <SuggestionItem onPress={() => handleAddressSelection(item)}>
                  <SuggestionText>{item.formatted}</SuggestionText>
                </SuggestionItem>
              )}
              style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ccc', zIndex: 1000 }}
            />
          )}

          <CheckboxContainer onPress={() => setIsFree(!isFree)}>
            <Checkbox isChecked={isFree} />
            <CheckboxLabel>Evento Gratuito</CheckboxLabel>
          </CheckboxContainer>

          {!isFree && (
            <Input
              placeholder="Valor do Evento (R$)"
              keyboardType="numeric"
              value={eventPrice}
              onChangeText={setEventPrice}
            />
          )}

          <SubmitButton onPress={handleSubmit} disabled={isSubmitting}>
            <SubmitButtonText>
                {isSubmitting ? 'Criando Evento...' : 'Criar Evento'}
            </SubmitButtonText>
          </SubmitButton>

        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}