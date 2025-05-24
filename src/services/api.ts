import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.18.13:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }, 
});
export const eventRouter = axios.create({
  baseURL: 'http://192.168.18.13:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'multipart/form-data' }, 

});
