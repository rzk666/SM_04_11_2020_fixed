/* eslint-disable no-shadow */
// Types
import {
  UPDATE_TABLE,
  CONFIRM_BETS,
} from './activeTableTypes';

export const updateActiveTable = (data, user) => ({
  type: UPDATE_TABLE,
  data,
  user,
});

export const confirmBets = (data, username) => ({
  type: CONFIRM_BETS,
  data,
  username,
});
