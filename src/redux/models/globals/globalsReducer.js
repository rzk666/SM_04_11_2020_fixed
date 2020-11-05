// Initial state
import { INITIAL_STATE } from '../../../common/app-const';
// Types
import {
  GET_DEPARTMENTS,
  GLOBALS_IS_LOADING,
  GLOBALS_HAS_ERROR,
} from './globalsTypes';

// This is temp and will change soon
const globals = (state = INITIAL_STATE.users, action) => {
  switch (action.type) {
    case GLOBALS_IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case GET_DEPARTMENTS: {
      const { data } = action;
      return {
        ...state,
        departments: data,
        hasError: false,
        errorCode: -1,
      };
    }
    case GLOBALS_HAS_ERROR: {
      if (!action.data) {
        return {
          ...state,
          hasError: action.data,
          errorCode: -1,
          isLoading: false,
        };
      }
      return {
        ...state,
        hasError: true,
        errorCode: `e${action.data}`,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default globals;
