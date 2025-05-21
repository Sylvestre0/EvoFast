import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.18.13:3000',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }, 
});
