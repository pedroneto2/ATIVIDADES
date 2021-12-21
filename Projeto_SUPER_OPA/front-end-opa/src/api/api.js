import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const orderLists = async (cookedForm) => {
  const { data } = await api.post('/ordenaLista', cookedForm);
  return data;
};

export const isInterlaced = async (cookedForm) => {
  const { data } = await api.post('/interlace?/', cookedForm);
  return data;
};
