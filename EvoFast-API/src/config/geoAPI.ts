// src/utils/geoAPI.ts

import axios from 'axios';
import { GeoapifyFeatureProperties, GeoapifyQueryParams } from '../models/geoApiModel';

export const searchAddressGeoapify = async (params: GeoapifyQueryParams): Promise<GeoapifyFeatureProperties | null> => {
  const { cep, numero, lang = 'pt', filter = 'countrycode:br' } = params;

  let queryText = cep;
  if (numero !== undefined) {
    queryText += `, ${numero}`;
  }

  const encodedQuery = encodeURIComponent(queryText);
  const apiKey = "c535190236564667ac40594a31345c0d"

  if (!apiKey) {
    throw new Error('GEOAPIFY_API_KEY não definida nas variáveis de ambiente.');
  }

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedQuery}&lang=${lang}&filter=${filter}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.features && data.features.length > 0) {
      return data.features[0].properties;
    } else {
      return null;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'Erro desconhecido.';
    throw new Error(`Falha na comunicação com a API de geocodificação: ${errorMessage}`);
  }
};