// Initial State
import { INITIAL_STATE } from '../../../common/app-const';
// Action Types
import {
  AUTHLOGIN,
  AUTH_HAS_ERROR,
  AUTH_IS_LOADING,
  REFRESH_AUTH,
  SIGNOUT,
} from './authTypes';

const auth = (state = INITIAL_STATE.auth, action) => {
  switch (action.type) {
    case REFRESH_AUTH: {
      const { data } = action;
      return {
        ...data,
      };
    }
    case AUTHLOGIN: {
      const { data } = action.data;
      const { customToken } = data;
      return {
        ...state,
        token: customToken,
        isLoading: false,
        isLoggedIn: !!customToken,
      };
    }
    case SIGNOUT: {
      return { ...INITIAL_STATE.auth };
    }
    case AUTH_IS_LOADING: {
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
        hasError: false,
        error: '',
      };
    }
    case AUTH_HAS_ERROR: {
      const { error } = action;
      if (!error) {
        return {
          ...state,
          hasError: false,
          error: '',
          isLoading: false,
        };
      }
      return {
        ...state,
        hasError: true,
        error,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
