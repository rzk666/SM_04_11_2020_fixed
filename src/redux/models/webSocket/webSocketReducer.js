// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Types
import {
  WEB_SOCKET_IS_LOADING,
  INIT_WEB_SOCKET,
} from './webSocketTypes';


const webSocket = (state = INITIAL_STATE.webSocket, action) => {
  switch (action.type) {
    case WEB_SOCKET_IS_LOADING: {
      const { data } = action;
      return {
        ...state,
        isLoading: data,
      };
    }
    case INIT_WEB_SOCKET: {
      const { data } = action;
      return {
        ...state,
        connected: data,
      };
    }
    default: {
      return state;
    }
  }
};

export default webSocket;
