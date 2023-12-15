import axios, { AxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';
