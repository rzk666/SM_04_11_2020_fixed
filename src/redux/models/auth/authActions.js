/* eslint-disable no-shadow */
// Types
import {
  AUTH_IS_LOADING,
  REFRESH_AUTH,
  AUTH_HAS_ERROR,
  AUTH_LOGIN,
  AUTH_ADMIN,
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

// Regular User
export const authLogin = (data) => ({
  type: AUTH_LOGIN,
  data,
});

// System Access
export const authAdmin = (data) => ({
  type: AUTH_ADMIN,
  data,
});

// TODO: Add login for admin & user ?
// Currently this refreshes admin auth
export const refreshAuth = (data) => ({
  type: REFRESH_AUTH,
  data,
});

// User login
export const login = (data) => (({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: '/auth/loginUser',
    },
    method: 'post',
    data,
    success: (data) => authLogin(data),
    failure: (data) => authHasError(data),
    loader: async (data) => authIsLoading(data),

  },
}));

// Admin Login
export const adminLogin = (data) => (({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: '/auth/login',
    },
    method: 'post',
    data,
    success: (data) => authAdmin(data),
    failure: (data) => authHasError(data),
    loader: (data) => authIsLoading(data),
  },
}));
