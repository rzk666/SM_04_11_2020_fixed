// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types

const availableMatches = (state = INITIAL_STATE.availableMatches, action) => {
  switch (action.type) {
    case 'zld': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default availableMatches;
