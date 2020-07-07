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
    name: 'Razi Elbaz',
    rank: 'pro',
    email: 'razi@beatem.uk',
    score: 1000,
    achivments: [],
    balance: 1450,
    profilePicture: Razi,
    notifications: 1,
    stats: {
      score: 1000,
      accuracyRate: 76.5,
      friendsPlaying: 65,
      totalWins: 26,
      leaguesPlayed: 34,
      privateLeagues: 3,
      firstPlace: 15,
      secondPlace: 7,
      thirdPlace: 4,
    },
  },
  tal: {
    name: 'Tal Hakim',
    email: 'tal@beatem.uk',
    rank: 'legend',
    score: 1000,
    achivments: [],
    notifications: 3,
    balance: 980,
    profilePicture: Tal,
    stats: {
      score: 1000,
      accuracyRate: 76.5,
      friendsPlaying: 65,
      totalWins: 26,
      leaguesPlayed: 34,
      privateLeagues: 3,
      firstPlace: 15,
      secondPlace: 7,
      thirdPlace: 4,
    },
  },
  lee: {
    name: 'Lee Lavy',
    rank: 'amateur',
    email: 'lee@beatem.uk',
    score: 1200,
    balance: 455,
    notifications: 4,
    achivments: [],
    profilePicture: Lee,
    stats: {
      score: 1200,
      accuracyRate: 76.5,
      friendsPlaying: 65,
      totalWins: 26,
      leaguesPlayed: 34,
      privateLeagues: 3,
      firstPlace: 15,
      secondPlace: 7,
      thirdPlace: 4,
    },
  },
  barak: {
    rank: 'pro',
    name: 'Barak Bouaniche',
    email: 'barak@beatem.uk',
    score: 1231,
    balance: 1270,
    notifications: 2,
    achivments: [],
    profilePicture: Barak,
    stats: {
      accuracyRate: 76.5,
      friendsPlaying: 65,
      score: 1231,
      totalWins: 26,
      leaguesPlayed: 34,
      privateLeagues: 3,
      firstPlace: 15,
      secondPlace: 7,
      thirdPlace: 4,
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
