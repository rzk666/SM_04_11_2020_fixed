import React from 'react';
// Styles
import styles from './LiveStatus.module.scss';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';
import LeagueLiveTable from '../common/LeagueLiveTable';

// ----- Help Functions ----- //
const getLeagueMatches = (currentLeague, availableMatches, currentMatches) => {
  const leagueMatches = availableMatches.filter((match) => {
    const { id, league } = match;
    return (currentMatches.includes(id) && currentLeague === league);
  });
  return leagueMatches;
};

const LiveStatus = ({ activeTable, availableMatches }) => {
  const { leagues, matches } = activeTable;
  return (
    <div className={styles.container}>
      {leagues.map((league) => (
        <div style={{ width: '90%' }}>
          <LeagueLiveTable
            type="live"
            currentLeague={league}
            matches={getLeagueMatches(league, availableMatches.matches, matches)}
          />
        </div>
      ))}
    </div>
  );
};

export default LiveStatus;
