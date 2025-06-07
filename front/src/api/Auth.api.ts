import { apiClient } from 'api';
import { ISignIn } from 'types/Auth.interface';

/* eslint-disable no-useless-catch */

export const login = async (body: ISignIn) => {
  try {
    const response = await apiClient.post('/auth/login', body);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const me = async () => {
  try {
    const response = await apiClient.get('/auth/me');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const response = await apiClient.get('/auth/check_session');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post('/auth/logout');

    return response.data;
  } catch (error) {
    throw error;
  }
};
