import { AxiosRequestConfig } from 'axios';
import { apiClient } from './interceptor';

interface fetchAllNFTObject {
  page: number;
  limit: number;
}
interface fetchNFTByIdInput {
  id: string;
}

export const fetchAllNFT = async (fetchAllNFTObject: fetchAllNFTObject) => {
  const resp = await apiClient.get(`/api/nft/fetchAllNFTs`, {
    params: fetchAllNFTObject,
  });
  return resp.data;
};

export const fetchNFTById = async (fetchNFTById: fetchNFTByIdInput) => {
  const resp = await apiClient.post(`/api/nft/getNFT`, fetchNFTById);
  return resp.data;
};
