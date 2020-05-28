// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import {
  AUTH_LOGIN,
  AUTH_ADMIN,
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
    // Regular user
    case AUTH_LOGIN: {
      const { data } = action;
      const { userToken } = data;
      return {
        ...state,
        token: userToken,
        isLoading: false,
        isLoggedIn: !!userToken,
      };
    }
    // Admin user
    case AUTH_ADMIN: {
      const { data } = action;
      const { adminToken } = data;
      return {
        ...state,
        adminToken,
        hasAccess: !!adminToken,
        isLoading: false,
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
