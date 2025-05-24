import axios from 'axios';

import { GeoapifyFeatureProperties } from '../models/geoApiModel'; 

export const searchAddressGeoapify = async (enderecoCompleto: string): Promise<GeoapifyFeatureProperties | null> => {
    const lang = 'pt'; 
    const filter = 'countrycode:br'; 
    const encodedQuery = encodeURIComponent(enderecoCompleto);
    
    const apiKey = "c535190236564667ac40594a31345c0d";

    if (!apiKey) {
        throw new Error('GEOAPIFY_API_KEY não definida. Por favor, forneça sua chave da API Geoapify.');
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedQuery}&lang=${lang}&filter=${filter}&apiKey=${apiKey}`;

    console.log('URL Geoapify Search (enderecoCompleto) chamada:', url); 

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.features && data.features.length > 0) {
            // Retorna as propriedades do primeiro resultado encontrado, que inclui lat/lon
            return data.features[0].properties;
        } else {
            return null;
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.error?.message || error.message || 'Erro desconhecido.';
        console.error('Erro na comunicação com a API de geocodificação (Search - enderecoCompleto):', errorMessage);
        throw new Error(`Falha na comunicação com a API de geocodificação: ${errorMessage}`);
    }
};