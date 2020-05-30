import { combineReducers } from 'redux';
import auth from './models/auth/authReducer';
import assets from './models/assets/assetsReducer';

export default combineReducers({
  assets,
  auth,
});
