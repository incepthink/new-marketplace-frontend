import axios, { AxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://marketplace.stablevaults.com/',
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';
