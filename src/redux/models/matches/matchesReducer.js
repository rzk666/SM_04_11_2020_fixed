// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import { UPDATE_MATCH } from './matchesTypes';

const availableMatches = (state = INITIAL_STATE.availableMatches, action) => {
  switch (action.type) {
    case UPDATE_MATCH: {
      const { matchId, updatedMatch } = action;
      const { matches } = state;
      const newMatches = [...matches].filter((match) => match.id !== parseInt(matchId));
      newMatches.push(updatedMatch);
      return { ...state, matches: newMatches };
    }
    default: {
      return state;
    }
  }
};

export default availableMatches;
