import React from 'react';
// Styles
import styles from './LiveStatusTable.module.scss';
// Images
import PremiereLeague from '../../static/images/leagues/premier.png';
import Champions from '../../static/images/leagues/champions.png';
import LaLiga from '../../static/images/leagues/laliga.png';
// Util
import classnames from 'classnames';

// FAKE DATA
import { LA_LIGA_TABLE, PREMIERE_LEAGUE_TABLE } from '../../common/fake-data';

// ----- Help Functions ----- //
const getLeagueImage = (league) => {
  switch (league) {
    case 'La Liga':
      return LaLiga;
    case 'Champions League':
      return Champions;
    case 'Premiere League':
      return PremiereLeague;
    default:
      return PremiereLeague;
  }
};

const TableTopRow = () => (
  <div className={styles.top_row_container}>
    <div className={styles.position}>
      POS
    </div>
    <div className={styles.team}>
      TEAM
    </div>
    <div className={styles.games}>
      PL
    </div>
    <div className={styles.wins}>
      W
    </div>
    <div className={styles.draws}>
      D
    </div>
    <div className={styles.loses}>
      L
    </div>
    <div className={styles.goals}>
      F
    </div>
    <div className={styles.against}>
      A
    </div>
    <div className={styles.goal_differance}>
      GD
    </div>
    <div className={styles.points}>
      Pts
    </div>
    <div className={styles.last_six}>
      Last 6
    </div>
  </div>
);

const LastSix = ({ data }) => (
  <div className={styles.last_six_wrapper}>
    {data.map((result) => (
      <div
        className={classnames(styles.dot,
          {
            [styles.win]: result === 'win',
            [styles.draw]: result === 'draw',
            [styles.lose]: result === 'lose',
          })}
      />
    ))}
  </div>
);

const TeamRow = ({ team }) => {
  const {
    name, rank, games, wins, draws, loses, goals, against, points, lastSixMatches, img,
  } = team;
  return (
    <div className={styles.team_row_container}>
      <div className={styles.position}>
        {rank}
      </div>
      <div className={styles.team}>
        <img
          src={img}
          alt="team"
          style={{ width: '20px', marginRight: '6.5px' }}
        />
        {name}
      </div>
      <div className={styles.games}>
        {games}
      </div>
      <div className={styles.wins}>
        {wins}
      </div>
      <div className={styles.draws}>
        {draws}
      </div>
      <div className={styles.loses}>
        {loses}
      </div>
      <div className={styles.goals}>
        {goals}
      </div>
      <div className={styles.against}>
        {against}
      </div>
      <div className={styles.goal_differance}>
        {goals - against}
      </div>
      <div className={styles.points}>
        {points}
      </div>
      <div className={styles.last_six}>
        <LastSix data={lastSixMatches} />
      </div>
    </div>
  );
};

const LeagueLiveTable = ({
  currentLeague,
}) => {
  const currentLeagueTable = currentLeague === 'Premiere League' ? PREMIERE_LEAGUE_TABLE : LA_LIGA_TABLE;

  return (
    <div className={styles.table_container}>
      <div className={styles.table_title}>
        <img
          src={getLeagueImage(currentLeague)}
          alt="Premiere League"
          style={{ width: '20px', marginRight: '5px' }}
        />
        {currentLeague}
      </div>
      <>
        <TableTopRow />
        {currentLeagueTable.map((team) => (
          <TeamRow team={team} />
        ))}
        <div className={styles.bottom} />
      </>

    </div>
  );
};

export default LeagueLiveTable;
