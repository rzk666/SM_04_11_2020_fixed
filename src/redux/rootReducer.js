import { combineReducers } from 'redux';
import users from './models/users/usersReducer';
import auth from './models/auth/authReducer';
import globals from './models/globals/globalsReducer';

export default combineReducers({
  users,
  auth,
  globals,
});
