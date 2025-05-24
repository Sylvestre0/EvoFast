import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://855d-177-8-164-166.ngrok-free.app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }, 
});
export const eventRouter = axios.create({
  baseURL: 'https://855d-177-8-164-166.ngrok-free.app',
  timeout: 10000,
  headers: { 'Content-Type': 'multipart/form-data' }, 

});
