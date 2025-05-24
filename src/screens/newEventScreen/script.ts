import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Country, CountryCode } from 'react-native-country-picker-modal';
import { eventRouter } from '@/services/api'; 
import { searchAddressAutocompleteGeoapify, GeoapifyAutocompleteResult } from '@/utils/geoAPI';
import debounce from 'lodash.debounce';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';

export function useEventForm() {
    const navigation = useNavigation();

    // --- Estados do Formulário ---
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imageMimeType, setImageMimeType] = useState<string | null>(null);
    const [imageFileName, setImageFileName] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [selectedDateObject, setSelectedDateObject] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [countryCode, setCountryCode] = useState<CountryCode>("BR");
    const [countryName, setCountryName] = useState("Brasil");
    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const [addressInput, setAddressInput] = useState("");
    const [addressSuggestions, setAddressSuggestions] = useState<GeoapifyAutocompleteResult[]>([]);
    const [selectedAddressFull, setSelectedAddressFull] = useState<string | null>(null);
    const [eventState, setEventState] = useState("");


    const [isFree, setIsFree] = useState(false);
    const [eventPrice, setEventPrice] = useState("");

    // --- Funções de Manipulação de Imagem ---
 const imageCUT = (mimeType: string) => {
  switch (mimeType) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'image/gif': return 'gif';
    default: return 'jpeg';
  }
};

const MAX_IMAGE_WIDTH = 160;
const MAX_IMAGE_HEIGHT = 120;
const COMPRESSION_QUALITY = 0.7;

const manipulateAndSetImage = async (asset: ImagePicker.ImagePickerAsset) => {
    const originalUri = asset.uri;
    const imageWidth = asset.width;
    const imageHeight = asset.height;

    let actions = [];

    const widthScaleFactor = MAX_IMAGE_WIDTH / imageWidth;
    const heightScaleFactor = MAX_IMAGE_HEIGHT / imageHeight;
    const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

    if (scaleFactor < 1) {
      const newWidth = imageWidth * scaleFactor;
      const newHeight = imageHeight * scaleFactor;
      actions.push({ resize: { width: Math.round(newWidth), height: Math.round(newHeight) } });
    } else {
        console.log('Imagem original já está dentro das dimensões máximas. Apenas compressão será aplicada.');
    }

    try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            originalUri,
            actions,
            { compress: COMPRESSION_QUALITY, format: SaveFormat.JPEG, base64: true }
        );

        setImageUri(manipulatedImage.uri);
        setImageBase64(manipulatedImage.base64);
        setImageMimeType(asset.mimeType || 'image/jpeg');
        setImageFileName(asset.fileName || `event_image_${Date.now()}.${imageCUT(asset.mimeType || '')}`);

        console.log('--- Imagem Processada Automaticamente ---');
        console.log('Dimensões Finais:', manipulatedImage.width, 'x', manipulatedImage.height);

    } catch (error) {
        console.error('Erro ao processar imagem automaticamente:', error);
        Alert.alert('Erro', 'Não foi possível otimizar a imagem. Tente novamente.');
    }
};

const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert("Permissão Necessária", "Precisamos da permissão para acessar sua câmera para tirar fotos.");
        return;
    }
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
        await manipulateAndSetImage(result.assets[0]);
    }
};

const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert("Permissão Necessária", "Precisamos da permissão para acessar sua galeria de imagens.");
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
        await manipulateAndSetImage(result.assets[0]);
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
            if (text.length > 2) { // Começa a buscar a partir de 4 caracteres para economizar créditos
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
        }, 250), // Debounce de 500ms
        [countryCode] // Recria a função se o countryCode mudar
    );

    const handleAddressInputChange = (text: string) => {
        setAddressInput(text);
        debouncedFetchAddressSuggestions(text);
        setSelectedAddressFull(null);
        setEventState("");
    };

    const handleAddressSelection = (suggestion: GeoapifyAutocompleteResult) => {
        setAddressInput(suggestion.formatted); 
        setSelectedAddressFull(suggestion.formatted);
        setAddressSuggestions([]);
        setEventState(suggestion.state || '');
    };

    // --- Funções de Submissão ---
    const handleSubmit = async () => {
        if (!eventName || !eventDate || !countryName || !selectedAddressFull || !imageUri) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios e selecione um endereço válido.");
            return;
        }
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

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
        formData.append('code',countryCode.toLowerCase())
        formData.append('enderecoCompleto', selectedAddressFull);  
 
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
                setAddressInput(""); setAddressSuggestions([]);
                setSelectedAddressFull(null); setIsFree(false); setEventPrice("");
                setEventState(""); 
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
        addressSuggestions, isFree, eventPrice,isSubmitting,
        // Funções de atualização de estado
        setImageUri, setEventName, setEventDate, setShowDatePicker, setSelectedDateObject,
        setCountryCode, setCountryName, setShowCountryPicker, setAddressInput,
        setAddressSuggestions, setIsFree, setEventPrice,
        // Funções de manipuladores
        showImageOptions, handleDateChange, onSelectCountry,
        handleAddressInputChange, handleAddressSelection, handleSubmit,
        setIsSubmitting
    };
}