import React from "react";
import { Platform, TouchableOpacity, Alert, FlatList, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import { useEventForm } from '@/screens/newEventScreen/script'; // Importa o hook

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
    setImageUri, setEventName, setEventDate, setShowDatePicker, setSelectedDateObject,
    setCountryCode, setCountryName, setShowCountryPicker, setAddressInput,
    setAddressSuggestions, setIsFree, setEventPrice,
    showImageOptions, handleDateChange, onSelectCountry,
    handleAddressInputChange, handleAddressSelection, handleSubmit
  } = useEventForm(); 

  return (
    <Container>
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

      {/* NOVO CAMPO DE ENDEREÇO COM AUTOCOMPLETAR */}
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
          // Você pode precisar adicionar um estilo para a FlatList para que ela não se expanda
          // além do limite e fique sobreposta, por exemplo, maxHeight
          style={{ maxHeight: 200, borderWidth: 1, borderColor: '#ccc', zIndex: 1000 }} 
        />
      )}
      {/* FIM DO NOVO CAMPO */}

      {/* Você pode remover os campos de CEP e Número, se o autocomplete for o único método.
          Se quiser mantê-los como fallback ou para validação, ok.
          Se mantiver, considere preenchê-los automaticamente na seleção do autocomplete.
          Para este exemplo, vou manter, mas com o preenchimento automático. */}
      {/* <Input
        placeholder="CEP (preenchido automaticamente)"
        value={eventCEP} // Agora preenchido pelo autocomplete
        editable={false} // Não editável, apenas exibição
      />
      <Input
        placeholder="Número (preenchido automaticamente)"
        value={eventNumber} // Agora preenchido pelo autocomplete
        editable={false} // Não editável, apenas exibição
      />
      */}

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

      <SubmitButton onPress={handleSubmit}>
        <SubmitButtonText>Criar Evento</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}