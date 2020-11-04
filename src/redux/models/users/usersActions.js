// Types
import {
  USERS_IS_LOADING,
  USERS_HAS_ERROR,
  USERS_GET_DATA,
  HIDE_DEPARTMENT,
  HIDE_UNSELECTED
} from './usersTypes';
// API
import { API, api } from '../../api';
// config
import config from '../../../common/config';

export const usersIsLoading = (isLoading) => ({
  type: USERS_IS_LOADING,
  isLoading,
});

export const hideUnselectedUsers = () => ({
  type: HIDE_UNSELECTED,
});

export const hideDepartment = (id) => ({
  type: HIDE_DEPARTMENT,
  id,
});

export const usersGetData = (data, selected) => ({
  type: USERS_GET_DATA,
  data,
  selected,
});

export const usersHasError = (data) => ({
  type: USERS_HAS_ERROR,
  data,
});

export const fetchUsers = (firstIndex = 0, endIndex = 10, orderBy = 'department', withTasks = true) => (api({
  type: API,
  payload: {
    url: {
      base: 'https://testsh.free.beeceptor.com/getusers',
      // endpoint: `/users/?orderBy=${orderBy}&firstIndex=${firstIndex}&endIndex=${endIndex}&withTasks=${withTasks}`, // TEMP
      endpoint: '',
    },
    method: 'get',
    success: (data) => usersGetData(data, false),
    failure: (data) => usersHasError(data),
    loader: (data) => usersIsLoading(data),
  },
}));

export const fetchUsersByDepartment = (
  departmentId = 1,
) => (api({
  type: API,
  payload: {
    url: {
      base: `https://testsh.free.beeceptor.com/users/department/${departmentId}`,
      // endpoint: `/users/?orderBy=${orderBy}&firstIndex=${firstIndex}&endIndex=${endIndex}&withTasks=${withTasks}`, // TEMP
      endpoint: '',
    },
    method: 'get',
    success: (data) => usersGetData(data, true),
    failure: (data) => usersHasError(data),
    loader: (data) => usersIsLoading(data),
  },
}));
