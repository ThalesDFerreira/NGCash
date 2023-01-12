import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_PORT}`,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestTableTransactions = async (endpoint: string) => {
  const { data } = await api.get(endpoint); 
  return data;
};

export const requestTransaction = async (endpoint: string, body: object) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint: string, body: object) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestLogin = async (endpoint: string, body: object) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
