// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import { UPDATE_TABLE, CONFIRM_BETS } from './activeTableTypes';

const activeTable = (state = INITIAL_STATE.activeTable, action) => {
  switch (action.type) {
    case UPDATE_TABLE: {
      const { data, user } = action;
      const { players } = data;
      const newUsersList = [...state.users].splice(0, players > 8 ? 8 : players - 1);
      let shouldPushUser = true;
      state.users.forEach((activeUser) => {
        if (activeUser.name === user.name) {
          shouldPushUser = true;
        }
      });
      if (shouldPushUser) {
        newUsersList.push({ ...user, currentScore: 0 });
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
