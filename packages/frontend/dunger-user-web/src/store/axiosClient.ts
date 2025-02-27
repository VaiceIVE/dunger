import axios from 'axios';
import { apiUrl } from './config';

export const axiosClient = axios.create({ baseURL: apiUrl });

// вообще это очень странно выглядит – но использовать в react-query правда становится удобнее:
// queryFn: () => axiosClient.get('/layout') вместо queryFn: () => axiosClient.get('/layout').then((res) => res.data)
axiosClient.interceptors.response.use((response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
});
