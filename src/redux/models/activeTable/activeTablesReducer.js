// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import { UPDATE_TABLE, CONFIRM_BETS } from './activeTableTypes';

const activeTable = (state = INITIAL_STATE.activeTable, action) => {
  switch (action.type) {
    case UPDATE_TABLE: {
      const { data, user } = action;
      const newUsersList = [...state.users];
      let shouldPushUser = true;
      state.users.forEach((activeUser) => {
        if (activeUser.name === user.name) {
          shouldPushUser = false;
        }
      });
      if (shouldPushUser) {
        newUsersList.push(user);
      }
      return {
        ...state,
        ...data,
        users: newUsersList,
      };
    }
    case CONFIRM_BETS: {
      const { data, username } = action;
      const { users } = state;
      const playerUser = users.find((user) => user.name === username);
      const newUsersArray = [...users].filter((user) => user.name !== username);
      const userWithUpdatedBets = { ...playerUser, bets: data };
      newUsersArray.push(userWithUpdatedBets);
      return {
        ...state,
        users: newUsersArray,
      };
    }
    default: {
      return state;
    }
  }
};

export default activeTable;
