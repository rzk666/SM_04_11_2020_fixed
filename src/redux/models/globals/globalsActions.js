// Types
import {
  GLOBALS_IS_LOADING,
  GET_DEPARTMENTS,
  GLOBALS_HAS_ERROR,
} from './globalsTypes';
// API
import { API, api } from '../../api';
// config
import config from '../../../common/config';

export const globalsIsLoading = (isLoading) => ({
  type: GLOBALS_IS_LOADING,
  isLoading,
});

export const getDepartments = (data) => ({
  type: GET_DEPARTMENTS,
  data,
});

export const globalsHasError = (data) => ({
  type: GLOBALS_HAS_ERROR,
  data,
});

export const fetchDepartments = () => (api({
  type: API,
  payload: {
    url: {
      base: 'https://testsh.free.beeceptor.com/globals/getdepartments',
      // endpoint: `/users/?orderBy=${orderBy}&firstIndex=${firstIndex}&endIndex=${endIndex}&withTasks=${withTasks}`, // TEMP
      endpoint: '',
    },
    method: 'get',
    success: (data) => getDepartments(data),
    failure: (data) => globalsHasError(data),
    loader: (data) => globalsIsLoading(data),
  },
}));
