import { combineReducers } from 'redux';
import auth from './models/auth/authReducer';
import activeLeague from './models/activeLeague/activeLeagueReducer';
import activeTable from './models/activeTable/activeTablesReducer';
import availableMatches from './models/matches/matchesReducer';

export default combineReducers({
  auth,
  activeLeague,
  activeTable,
  availableMatches,
});
