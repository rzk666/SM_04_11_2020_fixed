/* eslint-disable no-shadow */
// Types
import {
  AUTH_IS_LOADING,
  REFRESH_AUTH,
  AUTH_HAS_ERROR,
  AUTHLOGIN,
  SIGNOUT,
} from './authTypes';
// API
import { API } from '../../api';
// Additional Imports
import config from '../../../common/config';

export const signOut = () => ({
  type: SIGNOUT,
});

export const authIsLoading = (isLoading) => ({
  type: AUTH_IS_LOADING,
  isLoading,
});

export const authHasError = (error) => ({
  type: AUTH_HAS_ERROR,
  error,
});

export const authLogin = (data) => ({
  type: AUTHLOGIN,
  data,
});

export const refreshAuth = (data) => ({
  type: REFRESH_AUTH,
  data,
});

export const login = (data) => (({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: '/auth/login',
    },
    method: 'post',
    data,
    success: (data) => authLogin(data),
    failure: (data) => authHasError(data),
    loader: (data) => authIsLoading(data),
  },
}));
