import axios, { AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'DELETE';

interface IRequestConfig {
  url: string;
  body?: any;
  headers?: { [key: string]: string };
  method?: HttpMethod;
  withCredentials?: boolean; // Добавляем новую опцию
}

export const useHttp = () => {
  const request = async <T>({
    url,
    method = 'GET',
    body = null,
    withCredentials,
    headers = { 'Content-Type': 'application/json' }
  }: IRequestConfig): Promise<T> => {
    try {
      const { data }: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
        headers,
        withCredentials
      });

      return data;
    } catch (error) {
      /* eslint-disable no-console */
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
          console.error('Response error data:', error.response.data);
          console.error('Response error status:', error.response.status);
          console.error('Response error headers:', error.response.headers);
        } else if (error.request) {
          // Запрос был сделан, но ответ не получен
          console.error('Request error:', error.request);
        } else {
          // Произошло что-то при настройке запроса, вызвавшее ошибку
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      } else {
        // Если ошибка не связана с Axios
        console.error('Unexpected error:', error);
      }
      /* eslint-enable no-console */
      throw error;
    }
  };

  return { request };
};
