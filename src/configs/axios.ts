import axios, { AxiosRequestConfig } from 'axios';

type RequestData = Record<string, any>;

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = import.meta.env.VITE_BACKEND_API;

const baseConfig = (): AxiosRequestConfig<any> => {
  return {
    baseURL,
    timeout: THREE_MINUTES,
  };
};
/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const httpClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean },
  ) =>
    axios.get<T>(url, {
      ...baseConfig(),
      ...config,
    }),

  post: <T>(
    url: string,
    data: RequestData,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean },
  ) =>
    axios.post<T>(url, data, {
      ...baseConfig(),
      data,
      ...config,
    }),

  put: <T>(
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig<RequestData>,
  ) =>
    axios.put<T>(url, data, {
      ...baseConfig(),
      ...config,
    }),

  patch: <T>(
    url: string,
    data: RequestData,
    config?: AxiosRequestConfig<RequestData>,
  ) =>
    axios.patch<T>(url, data, {
      ...baseConfig(),
      ...config,
    }),

  delete: <T>(url: string, config?: AxiosRequestConfig<RequestData>) =>
    axios.delete<T>(url, {
      ...baseConfig(),
      ...config,
    }),
};

export { httpClient };
