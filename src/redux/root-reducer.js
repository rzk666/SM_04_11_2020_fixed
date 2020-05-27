import { combineReducers } from 'redux';
import auth from './models/auth/authReducer';

export default combineReducers({
  auth,
});
