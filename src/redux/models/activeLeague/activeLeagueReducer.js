// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types

const activeLeague = (state = INITIAL_STATE.activeLeague, action) => {
  switch (action.type) {
    case 'zld': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default activeLeague;
