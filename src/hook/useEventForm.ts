// src/hooks/useEventForm.ts
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Country, CountryCode } from 'react-native-country-picker-modal';
import { eventRouter } from '../services/api'; // Seu serviço de API

// <<< LINHA CORRIGIDA AQUI >>>
import { searchAddressAutocompleteGeoapify, GeoapifyAutocompleteResult, searchAddressGeoapify } from '@/utils/geoAPI'; // Funções Geoapify
// <<< FIM DA LINHA CORRIGIDA >>>

import debounce from 'lodash.debounce'; // Lembre-se de instalar: npm install lodash.debounce @types/lodash.debounce

export function useEventForm() {
    // ... o restante do seu código do hook ...
}