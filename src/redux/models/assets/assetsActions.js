/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
// Types
import {
  ASSET_HAS_ERROR,
  ASSET_IS_LOADING,
  GET_ASSET_PATH,
} from './assetsTypes';
// API
import { API } from '../../api';
// Additional Imports
import config from '../../../common/config';

export const getAssetPath = (data) => ({
  type: GET_ASSET_PATH,
  data,
});

export const assetsHasError = (error) => ({
  type: ASSET_HAS_ERROR,
  error,
});

export const assetsIsLoading = (isLoading) => ({
  type: ASSET_IS_LOADING,
  isLoading,
});

// User login
export const fetchAsset = (data) => (({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: `/assets/${data}`,
    },
    method: 'get',
    success: (data) => getAssetPath(data),
    failure: (data) => assetsHasError(data),
    loader: (data) => assetsIsLoading(data),
  },
}));
