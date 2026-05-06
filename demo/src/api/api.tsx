import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// import Cookies from 'universal-cookie';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_LOCATION}/api`,
  timeout: 35000,
});

api.interceptors.request.use(
  // (config: AxiosRequestConfig): AxiosRequestConfig => {
  //   const hash = cookies.get('hash');

  //   if (!hash) {
  //     return Promise.reject(new Error('No auth key'));
  //   }

  //   config.headers = config.headers || {};
  //   config.headers['X-Auth-Key'] = hash;

  //   return config;
  // },
  // (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default api;