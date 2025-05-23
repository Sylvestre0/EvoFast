import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Country, CountryCode } from 'react-native-country-picker-modal';
import { eventRouter } from '@/services/api'; 
import { searchAddressAutocompleteGeoapify, GeoapifyAutocompleteResult, searchAddressGeoapify } from '@/utils/geoAPI';
import debounce from 'lodash.debounce';

export function useEventForm() {
    const navigation = useNavigation();

    // --- Estados do Formulário ---
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imageMimeType, setImageMimeType] = useState<string | null>(null);
    const [imageFileName, setImageFileName] = useState<string | null>(null);

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [selectedDateObject, setSelectedDateObject] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [countryCode, setCountryCode] = useState<CountryCode>("BR");
    const [countryName, setCountryName] = useState("Brasil");
    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const [addressInput, setAddressInput] = useState(""); // Campo para a busca de endereço com autocompletar
    const [addressSuggestions, setAddressSuggestions] = useState<GeoapifyAutocompleteResult[]>([]);
    const [selectedAddressLat, setSelectedAddressLat] = useState<number | null>(null);
    const [selectedAddressLon, setSelectedAddressLon] = useState<number | null>(null);
    const [selectedAddressFull, setSelectedAddressFull] = useState<string | null>(null); // Endereço completo selecionado
    // Mantenha esses para envio ao backend, se o autocomplete não preencher tudo
    const [eventCEP, setEventCEP] = useState(""); 
    const [eventNumber, setEventNumber] = useState("");
    const [eventStreet, setEventStreet] = useState("");
    const [eventCity, setEventCity] = useState("");
    const [eventState, setEventState] = useState("");


    const [isFree, setIsFree] = useState(false);
    const [eventPrice, setEventPrice] = useState("");

    // --- Funções Auxiliares ---
    const getFileExtensionFromMime = (mimeType: string) => {
        if (!mimeType) return 'jpg';
        const parts = mimeType.split('/');
        return parts[1] || 'jpg';
    };

    // --- Funções de Manipulação de Imagem ---
    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permissão Necessária", "Precisamos da permissão para acessar sua câmera para tirar fotos.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, aspect: [4, 3], quality: 1, base64: true,
        });
        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            setImageUri(asset.uri); setImageBase64(asset.base64);
            setImageMimeType(asset.mimeType || 'image/jpeg');
            setImageFileName(asset.fileName || `event_image_${Date.now()}.${getFileExtensionFromMime(asset.mimeType || '')}`);
        }
    };

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permissão Necessária", "Precisamos da permissão para acessar sua galeria de imagens.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1, base64: true,
        });
        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            setImageUri(asset.uri); setImageBase64(asset.base64);
            setImageMimeType(asset.mimeType || 'image/jpeg');
            setImageFileName(asset.fileName || `event_image_${Date.now()}.${getFileExtensionFromMime(asset.mimeType || '')}`);
        }
    };

    const showImageOptions = () => {
        Alert.alert("Selecionar Imagem", "De onde você gostaria de pegar a imagem?",
            [{ text: "Câmera", onPress: openCamera }, { text: "Galeria", onPress: openImageLibrary }, { text: "Cancelar", style: "cancel" }],
            { cancelable: true }
        );
    };

    // --- Funções de Data ---
    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || selectedDateObject;
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDateObject(currentDate);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        setEventDate(`${day}/${month}/${year}`);
    };

    // --- Funções de País ---
    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        if (typeof country.name === 'object' && country.name !== null && 'common' in country.name) {
            setCountryName(country.name.common);
        } else {
            setCountryName(country.name as string);
        }
        setShowCountryPicker(false);
    };

    // --- Lógica de Autocompletar Endereço ---

    // Função debounced para chamar a API de autocompletar
    const debouncedFetchAddressSuggestions = useCallback(
        debounce(async (text: string) => {
            if (text.length > 3) { // Começa a buscar a partir de 4 caracteres para economizar créditos
                try {
                    const results = await searchAddressAutocompleteGeoapify(text, 'pt', `countrycode:${countryCode.toLowerCase()}`);
                    setAddressSuggestions(results);
                } catch (error) {
                    console.error("Erro ao buscar sugestões de endereço:", error);
                    setAddressSuggestions([]);
                }
            } else {
                setAddressSuggestions([]); // Limpa as sugestões se o texto for muito curto
            }
        }, 500), // Debounce de 500ms
        [countryCode] // Recria a função se o countryCode mudar
    );

    const handleAddressInputChange = (text: string) => {
        setAddressInput(text);
        debouncedFetchAddressSuggestions(text);
        // Resetar os campos de endereço específicos se o usuário estiver digitando novamente
        setSelectedAddressFull(null);
        setSelectedAddressLat(null);
        setSelectedAddressLon(null);
        setEventStreet("");
        setEventNumber("");
        setEventCEP("");
        setEventCity("");
        setEventState("");
    };

    const handleAddressSelection = (suggestion: GeoapifyAutocompleteResult) => {
        setAddressInput(suggestion.formatted); // Preenche o input com o endereço formatado
        setSelectedAddressFull(suggestion.formatted);
        setSelectedAddressLat(suggestion.lat);
        setSelectedAddressLon(suggestion.lon);
        setAddressSuggestions([]); // Esconde as sugestões

        // Preenche os campos individuais com dados do autocomplete para envio
        setEventStreet(suggestion.street || '');
        setEventNumber(suggestion.housenumber || '');
        setEventCEP(suggestion.postcode || '');
        setEventCity(suggestion.city || '');
        setEventState(suggestion.state || '');
    };

    // --- Funções de Submissão ---
    const handleSubmit = async () => {
        if (!eventName || !eventDate || !countryName || !selectedAddressFull || !selectedAddressLat || !selectedAddressLon || !eventStreet || !eventNumber || !eventCEP || !eventCity || !eventState) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios e selecione um endereço válido.");
            return;
        }

        let formattedDateForBackend = eventDate;
        if (eventDate.includes('/')) {
            const parts = eventDate.split('/');
            if (parts.length === 3) {
                formattedDateForBackend = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        }

        const formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('data', formattedDateForBackend);
        formData.append('pais', countryName);
        
        // Use as coordenadas e o endereço completo do autocomplete
        formData.append('latitude', String(selectedAddressLat));
        formData.append('longitude', String(selectedAddressLon));
        formData.append('enderecoCompleto', selectedAddressFull); // Novo campo para o endereço completo formatado
        
        // E os campos individuais, se seu backend ainda os espera separadamente
        formData.append('CEP', eventCEP);
        formData.append('numero', eventNumber);
        formData.append('rua', eventStreet); // Adicione 'rua'
        formData.append('cidade', eventCity); // Adicione 'cidade'
        formData.append('estado', eventState); // Adicione 'estado'


        formData.append('preco', isFree ? '0' : eventPrice);

        if (imageUri && imageMimeType && imageFileName) {
            formData.append('imagemEvento', {
                uri: imageUri,
                name: imageFileName,
                type: imageMimeType,
            } as any);
        }

        try {
            const response = await eventRouter.post('/PublishEvents', formData);
            const responseData = response.data;

            if (response.status >= 200 && response.status < 300) {
                Alert.alert("Sucesso", "Evento criado com sucesso!");
                // Resetar todos os estados
                setImageUri(null); setImageBase64(null); setImageMimeType(null); setImageFileName(null);
                setEventName(""); setEventDate(""); setSelectedDateObject(new Date()); setShowDatePicker(false);
                setCountryCode("BR"); setCountryName("Brasil"); setShowCountryPicker(false);
                setAddressInput(""); setAddressSuggestions([]); setSelectedAddressLat(null); setSelectedAddressLon(null);
                setSelectedAddressFull(null); setEventCEP(""); setEventNumber(""); setIsFree(false); setEventPrice("");
                setEventStreet(""); setEventCity(""); setEventState(""); // Resetar os novos campos
                navigation.goBack();
            } else {
                Alert.alert("Erro", responseData.error || "Erro ao criar evento.");
            }
        } catch (error: any) {
            console.error("Erro ao enviar evento:", error);
            if (error.response) {
                console.error("Dados do erro do servidor:", error.response.data);
                Alert.alert("Erro", error.response.data.error || "Erro ao criar evento.");
            } else if (error.request) {
                console.error("Requisição sem resposta:", error.request);
                Alert.alert("Erro", "Nenhuma resposta do servidor. Verifique a URL e a conexão.");
            } else {
                console.error("Erro na configuração da requisição:", error.message);
                Alert.alert("Erro", "Ocorreu um erro ao configurar a requisição.");
            }
        }
    };

    return {
        // Estados
        imageUri, eventName, eventDate, showDatePicker, selectedDateObject,
        countryCode, countryName, showCountryPicker, addressInput,
        addressSuggestions, isFree, eventPrice,
        // Funções de atualização de estado
        setImageUri, setEventName, setEventDate, setShowDatePicker, setSelectedDateObject,
        setCountryCode, setCountryName, setShowCountryPicker, setAddressInput,
        setAddressSuggestions, setIsFree, setEventPrice,
        // Funções de manipuladores
        showImageOptions, handleDateChange, onSelectCountry,
        handleAddressInputChange, handleAddressSelection, handleSubmit
    };
}