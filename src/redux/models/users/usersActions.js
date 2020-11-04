// Types
import {
  USERS_IS_LOADING,
  USERS_HAS_ERROR,
  USERS_GET_DATA,
} from './usersTypes';
// API
import { API, api } from '../../api';
// config
import config from '../../../common/config';

export const usersIsLoading = (isLoading) => ({
  type: USERS_IS_LOADING,
  isLoading,
});

export const usersGetData = (data) => ({
  type: USERS_GET_DATA,
  data,
});

export const usersHasError = (data) => ({
  type: USERS_HAS_ERROR,
  data,
});

export const fetchUsers = (firstIndex = 0, endIndex = 10, orderBy = 'department', withTasks = true) => (api({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: `/users/?orderBy=${orderBy}&firstIndex=${firstIndex}&endIndex=${endIndex}&withTasks=${withTasks}`, // TEMP
    },
    method: 'get',
    success: (data) => usersGetData(data),
    failure: (data) => usersHasError(data),
    loader: (data) => usersIsLoading(data),
  },
}));
