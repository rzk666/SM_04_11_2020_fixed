// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import { UPDATE_TABLE } from './activeTableTypes';

const activeTable = (state = INITIAL_STATE.activeTable, action) => {
  switch (action.type) {
    case UPDATE_TABLE: {
      const { data, user } = action;
      const newUsersList = [...state.users, user];
      return {
        ...state,
        ...data,
        users: newUsersList,
      };
    }
    default: {
      return state;
    }
  }
};

export default activeTable;
