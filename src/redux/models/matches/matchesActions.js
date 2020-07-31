/* eslint-disable no-shadow */
// Types
import {
  RESET_AUTH_ERRORS,
  AUTH_IS_LOADING,
  REFRESH_AUTH,
  AUTH_HAS_ERROR,
  AUTH_ADMIN,
  SIGNOUT,
  LOGIN,
} from '../auth/authTypes';
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

export const resetAuthErrors = () => ({
  type: RESET_AUTH_ERRORS,
});

// System Access
export const authAdmin = (data) => ({
  type: AUTH_ADMIN,
  data,
});

export const refreshAuth = (data) => ({
  type: REFRESH_AUTH,
  data,
});

// User login
export const login = (data) => ({
  type: LOGIN,
  data,
});

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
