import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const statusCodes = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.NOT_FOUND
]);

const shouldDisplayError = (status: StatusCodes) => statusCodes.has(status);

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const {response} = error;
      if (response && shouldDisplayError(response.status)) {
        toast.warn(error.response?.data.error);
      }

      throw error;
    });

  return api;
};
