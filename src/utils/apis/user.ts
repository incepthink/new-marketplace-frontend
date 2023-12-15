import { AxiosRequestConfig } from 'axios';
import { apiClient } from './interceptor';

interface loginObject {
  email: string;
  password: string;
}

export const getUsersApi = async () => {
  const resp = await apiClient.get(`/user/all`);
  return resp.data;
};

export const getToken = async () => {
  const resp = await apiClient.get(`/api/user/getToken`);
  return resp.data.message;
};

export const verifyToken = async (tokenObject: object) => {
  const resp = await apiClient.post(`/api/user/verifyToken`, tokenObject);
  return resp.data;
};

export const loginUser = async (loginObject: loginObject) => {
  const resp = await apiClient.post(`/api/user/loginuser`, loginObject);
  return resp.data;
};
