/* eslint-disable no-shadow */
// Types
import {
  INIT_WEB_SOCKET,
  NEEDLESS,
} from './webSocketTypes';
// API
import { API } from '../../api';
// Additional Imports
import config from '../../../common/config';

export const needless = () => ({
  type: NEEDLESS,
});

export const initSocket = (data) => ({
  type: INIT_WEB_SOCKET,
  data,
});

export const connectSocket = () => (({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: '/socket/init',
    },
    method: 'get',
    success: () => needless(),
    failure: () => needless(),
    loader: () => needless(),
  },
}));
