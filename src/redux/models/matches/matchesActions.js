/* eslint-disable no-shadow */
// Types
import {
  UPDATE_MATCH,
} from './matchesTypes';

export const updateAvailableMatches = (matchId, updatedMatch) => ({
  type: UPDATE_MATCH,
  matchId,
  updatedMatch,
});

export const authIsLoading = () => ({
});
