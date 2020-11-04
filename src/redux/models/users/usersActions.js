// Types
import {
  USERS_IS_LOADING,
  USERS_HAS_ERROR,
  USERS_GET_DATA,
  HIDE_DEPARTMENT,
  HIDE_UNSELECTED,
  USER_GET_TASKS,
  HIDE_USER_TASKS,
} from './usersTypes';
// API
import { API, api } from '../../api';
// config
import config from '../../../common/config';

export const usersIsLoading = (isLoading) => ({
  type: USERS_IS_LOADING,
  isLoading,
});

export const userGetTasks = (id, data) => ({
  type: USER_GET_TASKS,
  data,
  id,
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

export const hideUserTasks = (id) => ({
  type: HIDE_USER_TASKS,
  id,
});

export const fetchUserTasks = (id) => (api({
  type: API,
  payload: {
    url: {
      base: 'https://testsh.free.beeceptor.com/gettask',
      // endpoint: `/users/${id}/tasks
      endpoint: '',
    },
    method: 'get',
    success: (data) => userGetTasks(id, data),
    failure: (data) => usersHasError(data),
    loader: (data) => usersIsLoading(data),
  },
}));

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
  firstIndex = 0,
  endIndex = 10,
) => (api({
  type: API,
  payload: {
    url: {
      base: `https://testsh.free.beeceptor.com/users/department/${departmentId}`,
      // endpoint: `/users/department?id=${departmentId}&firstIndex=${firstIndex}&endIndex=${endIndex}&withTasks=${withTasks}`, // TEMP
      endpoint: '',
    },
    method: 'get',
    success: (data) => usersGetData(data, true),
    failure: (data) => usersHasError(data),
    loader: (data) => usersIsLoading(data),
  },
}));
