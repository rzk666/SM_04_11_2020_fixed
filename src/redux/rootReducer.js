import { combineReducers } from 'redux';
import users from './models/users/usersReducer';
import auth from './models/auth/authReducer';

export default combineReducers({
  users,
  auth,
});
