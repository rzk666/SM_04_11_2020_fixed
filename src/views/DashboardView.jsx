import React, { useState } from 'react';
// Styles
import styles from './DashboardView.module.scss';
// Images
import Beatem from '../static/images/splash/mainSplash.svg';
// Libs
import { getTeamImage } from '../common/libs';
// Utils
import classnames from 'classnames';

const DashboardView = ({
  webSocket,
  availableMatches,
  triggerMatchChange,
}) => {
  const [activeMatch, setActive] = useState(0);
  const { connected } = webSocket;
  const { matches } = availableMatches;
  const currentMatch = matches.find((match) => parseInt(match.id) === activeMatch) || {};
  const {
    isLocked, homeScore, awayScore, matchTime,
  } = currentMatch;
  if (!connected) {
    return (
      <div className={styles.test}>
        connecting...
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <img
        src={Beatem}
        alt="Beatem"
        className={styles.beat_em}
      />
      <div className={styles.title}>
        ADMIN DASHBOARD
      </div>
      <div className={styles.matches_container}>
        {matches.map((match) => {
          const { id, homeTeam, awayTeam } = match;
          return (
            <div
              onClick={() => setActive(id)}
              className={classnames(styles.match, { [styles.active]: activeMatch === id })}
            >
              <div className={styles.match_title}>
                {`Match ${id}`}
              </div>
              <div className={styles.match_stats}>
                <div className={styles.home}>
                  HOME
                  <img
                    src={getTeamImage(homeTeam)}
                    alt="Home"
                  />
                  {homeTeam}
                </div>
                VS
                <div className={styles.away}>
                  AWAY
                  <img
                    src={getTeamImage(awayTeam)}
                    alt="Away"
                  />
                  {awayTeam}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      { activeMatch > 0
      && (
        <>
          <div className={styles.edit_match_container}>
            <div
              onClick={() => triggerMatchChange(activeMatch, { ...currentMatch, homeScore: currentMatch.homeScore + 1, order: 1 })}
              className={styles.btn}
            >
              HOME GOAL
            </div>
            <div
              onClick={() => triggerMatchChange(activeMatch, { ...currentMatch, awayScore: currentMatch.awayScore + 1, order: 1 })}
              className={styles.btn}
            >
              AWAY GOAL
            </div>
            <div
              onClick={() => triggerMatchChange(activeMatch, { ...currentMatch, isLocked: true, order: 3 })}
              className={styles.btn}
            >
              LOCK MATCH
            </div>
            <div
              onClick={() => triggerMatchChange(activeMatch, { ...currentMatch, matchTime: currentMatch.matchTime === 'HT' ? 46 : currentMatch.matchTime + 1, order: 1 })}
              className={styles.btn}
            >
              START MATCH
            </div>
            <div
              onClick={() => triggerMatchChange(activeMatch, { ...currentMatch, matchTime: 'HT', order: 2 })}
              className={styles.btn}
            >
              SET HALF TIME
            </div>
            <div
              onClick={() => triggerMatchChange(activeMatch, { ...currentMatch, matchTime: 'FT', order: 5 })}
              className={styles.btn}
            >
              SET FULL TIME
            </div>
          </div>
          <div className={styles.match_live_stats}>
            <div className={styles.stat}>
              {`Match Locked: ${isLocked}`}
            </div>
            <div className={styles.stat}>
              {`Match Time: ${matchTime}`}
            </div>
            <div className={styles.stat}>
              {`Home Score: ${homeScore}`}
            </div>
            <div className={styles.stat}>
              {`Away Score: ${awayScore}`}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardView;
