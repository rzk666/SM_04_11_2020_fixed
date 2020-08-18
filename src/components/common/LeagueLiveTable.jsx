import React from 'react';
// Styles
import styles from './LeagueLiveTable.module.scss';
// Images
import PremiereLeague from '../../static/images/leagues/premier.png';
import Champions from '../../static/images/leagues/champions.png';
import LaLiga from '../../static/images/leagues/laliga.png';
// Util
import classnames from 'classnames';
import { getShortDayName, getTeamImage } from '../../common/libs';

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
  </div>
);

// const LastSix = ({ data }) => (
//   <div className={styles.last_six_wrapper}>
//     {data.map((result) => (
//       <div
//         className={classnames(styles.dot,
//           {
//             [styles.win]: result === 'win',
//             [styles.draw]: result === 'draw',
//             [styles.lose]: result === 'lose',
//           })}
//       />
//     ))}
//   </div>
// );

const TeamRow = ({ team }) => {
  const {
    name, rank, games, wins, draws, loses, goals, against, points, lastSixMatches, img,
  } = team;
  return (
    <div className={styles.team_row_container}>
      <div style={{ position: 'relative' }} className={styles.position}>
        {rank}
        <div style={{
          position: 'absolute', right: '0', width: '5px', height: '5px', borderRadius: '255px', backgroundColor: '#e3e3e3',
        }}
        />
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
    </div>
  );
};

const MatchRow = ({ match }) => {
  const {
    homeTeam,
    awayTeam,
    startDate,
    matchTime,
    homeScore,
    awayScore,
  } = match;
  const isMatchLive = matchTime && Number.isInteger(matchTime);
  return (
    <div className={styles.match_row_container}>
      <div className={classnames(styles.time, { [styles.has_not_started]: !matchTime, [styles.is_live]: isMatchLive })}>
        {matchTime || ''}
      </div>
      <div className={styles.status_container}>
        <p className={styles.home}>{homeTeam}</p>
        <img src={getTeamImage(homeTeam)} alt="hometeam" />
        <div className={classnames(styles.score, { [styles.is_live]: (matchTime !== 0 && matchTime !== 'FT'), [styles.not_started]: !matchTime })}>
          { matchTime
            ? <p>{`${homeScore} - ${awayScore}`}</p>
            : (
              <>
                <p>{`${getShortDayName(startDate.getDay())}, ${startDate.getDate()}/${startDate.getMonth() + 1}`}</p>
                <p>{`${startDate.getHours()}:00`}</p>
              </>
            )}
        </div>
        <img src={getTeamImage(awayTeam)} alt="hometeam" />
        <p className={styles.away}>{awayTeam}</p>
      </div>
    </div>
  );
};

const LeagueLiveTable = ({
  currentLeague,
  type,
  matches,
}) => {
  if (matches) {
    matches.sort((a, b) => b.matchTime - a.matchTime);
  }
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
        { type !== 'live' && <TableTopRow />}
        <>
          {
        type !== 'live'
          ? currentLeagueTable.map((team) => (
            <TeamRow team={team} />
          ))
          : matches.map((match) => (<MatchRow match={match} />))
      }
        </>
        <div className={styles.bottom} />
      </>

    </div>
  );
};

export default LeagueLiveTable;
