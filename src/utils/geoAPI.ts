import axios from 'axios';

export interface GeoapifyAutocompleteResult {
    lon: number;
    lat: number;
    formatted: string; // Endereço formatado para exibir ao usuário
    place_id: string;  // ID único do local, útil para buscas de detalhes se necessário
    city?: string;
    state?: string;
    postcode?: string;
    street?: string;
    housenumber?: string;
    // Você pode adicionar mais propriedades se precisar dos dados brutos do autocomplete
}

// Interface para as propriedades de um Feature retornado pelo search
export interface GeoapifyFeatureProperties {
    lon: number;
    lat: number;
    formatted: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    state?: string;
    district?: string;
    suburb?: string;
    // Adicione outras propriedades que você espera da resposta do search
}

// Interface para os parâmetros de entrada da função searchAddressGeoapify (busca por endereço completo)
export interface GeoapifyQueryParams {
    text?: string; // Para busca de texto livre (menos precisa)
    cep?: string; // Para o parâmetro 'postcode'
    numero?: number | string; // Para o parâmetro 'housenumber'
    lang?: string;
    filter?: string;
    street?: string;
    city?: string;
    state?: string;
    postcode?: string; // Duplicata de 'cep' para clareza na API, use um ou outro
    district?: string;
    suburb?: string;
}

// --- Funções de Chamada à API Geoapify (rodando no seu App React Native) ---

/**
 * Função para buscar as coordenadas de um endereço completo.
 * Pode ser chamada com 'text' (string livre) ou com parâmetros estruturados para maior precisão.
 * @param params Objeto com os detalhes do endereço.
 * @returns As propriedades do primeiro resultado encontrado ou null.
 */
export const searchAddressGeoapify = async (params: GeoapifyQueryParams): Promise<GeoapifyFeatureProperties | null> => {
    const { lang = 'pt', filter = 'countrycode:br', text } = params;
    const apiKey = "c535190236564667ac40594a31345c0d"

    let urlParts: string[] = [`apiKey=${apiKey}`, `lang=${lang}`, `filter=${filter}`];

    // Decide se usa o parâmetro 'text' ou os parâmetros estruturados
    if (text) {
        urlParts.push(`text=${encodeURIComponent(text)}`);
    } else {
        // Usa parâmetros estruturados para maior precisão
        if (params.street) urlParts.push(`street=${encodeURIComponent(params.street)}`);
        if (params.numero !== undefined && params.numero !== null && String(params.numero).trim() !== '') {
            urlParts.push(`housenumber=${encodeURIComponent(String(params.numero))}`);
        }
        // Se 'cep' for fornecido, usa como 'postcode'
        if (params.cep) urlParts.push(`postcode=${encodeURIComponent(params.cep)}`);
        // Ou, se 'postcode' for fornecido diretamente
        else if (params.postcode) urlParts.push(`postcode=${encodeURIComponent(params.postcode)}`);

        if (params.city) urlParts.push(`city=${encodeURIComponent(params.city)}`);
        if (params.state) urlParts.push(`state=${encodeURIComponent(params.state)}`);
        if (params.district) urlParts.push(`district=${encodeURIComponent(params.district)}`);
        else if (params.suburb) urlParts.push(`suburb=${encodeURIComponent(params.suburb)}`);
    }

    const url = `https://api.geoapify.com/v1/geocode/search?${urlParts.join('&')}`;
    console.log('URL Geoapify Search chamada:', url);

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
        console.error('Erro na comunicação com a API de geocodificação (Search):', errorMessage);
        throw new Error(`Falha na comunicação com a API de geocodificação: ${errorMessage}`);
    }
};

/**
 * Função para buscar sugestões de endereços em tempo real (autocompletar).
 * @param partialAddress Texto parcial digitado pelo usuário.
 * @param lang Idioma dos resultados (padrão 'pt').
 * @param filter Filtro de país (padrão 'countrycode:br').
 * @returns Um array de sugestões de endereços.
 */
export const searchAddressAutocompleteGeoapify = async (
    partialAddress: string,
    lang: string = 'pt',
    filter: string = 'countrycode:br'
): Promise<GeoapifyAutocompleteResult[]> => {
    const apiKey = "c535190236564667ac40594a31345c0d"

    if (!apiKey) {
        throw new Error('GEOAPIFY_API_KEY não definida nas variáveis de ambiente. Verifique sua configuração.');
    }

    const encodedPartialAddress = encodeURIComponent(partialAddress);
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedPartialAddress}&lang=${lang}&filter=${filter}&apiKey=${apiKey}`;

    console.log('URL Geoapify Autocomplete chamada:', url);

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.features && data.features.length > 0) {
            return data.features.map((feature: any) => ({
                lon: feature.properties.lon,
                lat: feature.properties.lat,
                formatted: feature.properties.formatted,
                place_id: feature.properties.place_id,
                // Mapeie os campos adicionais que o autocomplete pode retornar
                city: feature.properties.city,
                state: feature.properties.state,
                postcode: feature.properties.postcode,
                street: feature.properties.street,
                housenumber: feature.properties.housenumber,
            }));
        } else {
            return [];
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.error?.message || error.message || 'Erro desconhecido.';
        console.error('Erro na comunicação com a API de autocompletar Geoapify:', errorMessage);
        throw new Error(`Falha na comunicação com a API de autocompletar: ${errorMessage}`);
    }
};