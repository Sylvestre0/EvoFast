// src/utils/geoAPI.ts

import axios from 'axios';
import { GeoapifyFeatureProperties, GeoapifyQueryParams } from '../models/geoApiModel';
import dotenv from 'dotenv';

export const searchAddressGeoapify = async (params: GeoapifyQueryParams): Promise<GeoapifyFeatureProperties | null> => {
  const { cep, numero, lang = 'pt', filter = 'countrycode:br' } = params;
  dotenv.config();

  let queryText = cep;
  if (numero !== undefined) {
    queryText += `, ${numero}`;
  }

  const encodedQuery = encodeURIComponent(queryText);
  const apiKey = process.env.GEOAPIFY_API_KEY;

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