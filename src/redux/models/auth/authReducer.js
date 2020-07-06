// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Misc
import Barak from '../../../static/images/profiles/Barak.png';
import Lee from '../../../static/images/profiles/Lee.png';
import Razi from '../../../static/images/profiles/Razi.png';
import Tal from '../../../static/images/profiles/Tal.png';
// Action Types
import {
  LOGIN,
  AUTH_ADMIN,
  AUTH_HAS_ERROR,
  AUTH_IS_LOADING,
  REFRESH_AUTH,
  SIGNOUT,
  RESET_AUTH_ERRORS,
} from './authTypes';

// ----- Consts & Dicts ----- //
const USERS = {
  razi: {
    name: 'razi',
    email: 'razi@beatem.uk',
    score: 1000,
    achivments: [],
    balance: 1450,
    profilePicture: Razi,
    notifications: 1,
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
    notifications: 3,
    balance: 980,
    profilePicture: Tal,
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
    balance: 455,
    notifications: 4,
    achivments: [],
    profilePicture: Lee,
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
    score: 1231,
    balance: 1270,
    notifications: 2,
    achivments: [],
    profilePicture: Barak,
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
    case RESET_AUTH_ERRORS: {
      return {
        ...state,
        hasError: false,
      };
    }
    // Regular user
    case LOGIN: {
      const { data } = action;
      const { email, password } = data;
      if (EMAILS.includes(email) && password === '123') {
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          userToken: 'good',
          user: USERS[email],
        };
      }
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: '',
        userToken: 'good',
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
