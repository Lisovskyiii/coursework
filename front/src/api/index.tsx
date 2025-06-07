import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'image/*' // Явно указываем, что принимаем изображения
  }
});
