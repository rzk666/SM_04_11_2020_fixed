// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import {
  LOGIN,
  AUTH_ADMIN,
  AUTH_HAS_ERROR,
  AUTH_IS_LOADING,
  REFRESH_AUTH,
  SIGNOUT,
} from './authTypes';

// ----- Consts & Dicts ----- //
const USERS = {
  razi: {
    name: 'razi',
    email: 'razi@beatem.uk',
    score: 1000,
    achivments: [],
    stats: {
      win: 2,
      lose: 8,
      totalWins: 1240,
      leaguesPlayed: 5,
    },
  },
  tal: {
    name: 'tal',
    email: 'tal@beatem.uk',
    score: 1000,
    achivments: [],
    stats: {
      win: 2,
      lose: 8,
      totalWins: 1240,
      leaguesPlayed: 5,
    },
  },
  lee: {
    name: 'lee',
    email: 'lee@beatem.uk',
    score: 1200,
    achivments: [],
    stats: {
      win: 3,
      lose: 5,
      totalWins: 1540,
      leaguesPlayed: 5,
    },
  },
  barak: {
    name: 'barak',
    email: 'barak@beatem.uk',
    score: 12331,
    achivments: [],
    stats: {
      win: 24,
      lose: 6,
      totalWins: 3666,
      leaguesPlayed: 2,
    },
  },
};

const EMAILS = ['barak', 'razi', 'tal', 'lee'];

const auth = (state = INITIAL_STATE.auth, action) => {
  switch (action.type) {
    case REFRESH_AUTH: {
      const { data } = action;
      return {
        ...data,
      };
    }
    // Regular user
    case LOGIN: {
      const { data } = action;
      const { email, password } = data;
      if (EMAILS.includes(email) && password === '123 ') {
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          user: USERS[email],
        };
      }
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: '',
        hasError: true,
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
