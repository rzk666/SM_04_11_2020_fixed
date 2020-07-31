/* eslint-disable no-shadow */
// Types
import {
  UPDATE_TABLE,
} from './activeTableTypes';

export const updateActiveTable = (data, user) => ({
  type: UPDATE_TABLE,
  data,
  user,
});

// REMOVE
export const authIsLoading = (isLoading) => ({
  type: 'test',
  isLoading,
});
