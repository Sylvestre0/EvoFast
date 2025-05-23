
export interface GeoapifyQueryParams {
  cep: string;
  numero?: number | string;
  lang?: string;
  filter?: string;
}

export interface GeoapifyFeatureProperties {
  lat: number;
  lon: number;
  result_type: string;
  [key: string]: any;
}