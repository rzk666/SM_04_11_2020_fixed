import { combineReducers } from 'redux';
import auth from './models/auth/authReducer';
import activeLeague from './models/auth/activeLeagueReducer';

export default combineReducers({
  auth,
  activeLeague,
});
