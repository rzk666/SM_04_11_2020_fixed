import React, { useState } from 'react';
// Styles
import styles from './Leaderboard.module.scss';
// Images
import LeagueAvatar from '../../static/images/createleague/LeagueAvatar.svg';
import Players from '../../static/images/leaderboard/WhitePlayer.svg';
import GoldTrophy from '../../static/images/leaderboard/GoldTrophy.svg';
import SilverTrophy from '../../static/images/leaderboard/SilverTrophy.svg';
import BronzeTrophy from '../../static/images/leaderboard/BronzeTrophy.svg';
import PremiereLeague from '../../static/images/leagues/premier.png';
import Champions from '../../static/images/leagues/champions.png';
import LaLiga from '../../static/images/leagues/laliga.png';
import DownArrow from '../../static/images/icons/DownArrow.svg';
import Sevillia from '../../static/images/teams/Sevillia.png';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';
import { getShortDayName } from '../../common/libs';

// ----- Help Functions ----- //
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

const getTeamImage = (team) => {
  switch (team) {
    case 'Barcelona':
      return Sevillia;
    default:
      return Sevillia;
  }
};

const UserBets = ({ user, matches }) => (
  <div className={styles.bets_container}>
    {matches.map((match) => {
      const {
        matchTime,
        isLocked,
        homeTeam,
        awayTeam,
        startDate,
        homeScore,
        awayScore,
      } = match;
      const isMatchLive = matchTime && Number.isInteger(matchTime);
      return (
        <div className={classnames(styles.match_row_container, { [styles.locked]: !isLocked })}>
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
    })}
  </div>
);

const User = ({
  user, rank, prizes, type, matches,
}) => {
  const { name, profilePicture, currentScore } = user;
  const [isActive, toggleActive] = useState(false);
  const isTopThree = (rank === 1 || rank === 2 || rank === 3);
  let shadowOne;
  let shadowTwo;
  let shadowLast;
  let mainColor;
  switch (rank) {
    case 1:
      shadowOne = 'rgba(229, 156, 51, 0.2)';
      shadowTwo = 'rgba(229, 156, 51, 0.7)';
      shadowLast = 'rgba(229, 156, 51, 0)';
      mainColor = 'rgba(229, 156, 51, 1)';
      break;
    case 2:
      shadowOne = 'rgba(140, 172, 175, 0.2)';
      shadowTwo = 'rgba(140, 172, 175, 0.7)';
      shadowLast = 'rgba(140, 172, 175, 0)';
      mainColor = 'rgba(140, 172, 175, 1)';
      break;
    case 3:
      shadowOne = 'rgba(186, 120, 74, 0.2)';
      shadowTwo = 'rgba(186, 120, 74, 0.7)';
      shadowLast = 'rgba(186, 120, 74, 0)';
      mainColor = 'rgba(186, 120, 74, 1)';
      break;
    default:
      shadowOne = '';
      mainColor = 0;
      break;
  }

  return (
    <>
      <motion.div
        style={{ boxShadow: `0 2px 3px 0 ${shadowOne || 'rgba(0,0,0,0)'}` }}
        onClick={() => toggleActive(!isActive)}
        animate={{ opacity: [1, 1, 1, 1], width: ['45%', '45%', '45%', '100%'] }}
        transition={{ delay: (0.10 * rank), ease: 'easeInOut', duration: 1.75 }}
        className={classnames(styles.user_row_container,
          {
            [styles.first]: rank === 1,
            [styles.second]: rank === 2,
            [styles.third]: rank === 3,
          })}
      >
        <motion.div
          transition={isTopThree ? {
            delay: 7 + (1 * rank), duration: 3.5, loop: Infinity, repeatDelay: 3.5, ease: 'easeIn',
          } : ''}
          animate={{ opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0] }}
          className={styles.bg_cover}
        />
        {rank}
        <motion.div animate={{ opacity: [1, 1, 1], scale: [1.1, 1] }} transition={{ delay: 3.1 + (rank * 0.10), ease: 'easeInOut', duration: 0.25 }} className={styles.user_main_container}>
          <img src={profilePicture} alt={`${name}_img`} className={styles.profile_image} />
          <p style={{ color: mainColor || '#53575a' }} className={styles.name}>{name}</p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 4.4 + (rank * 0.25) }}
            animate={{ opacity: [0.5, 1], scale: [1.1, 1] }}
            className={styles.prize_score_container}
          >
            { rank === 1 && <img src={GoldTrophy} alt="trophy" />}
            { rank === 1 && <div className={styles.prize}>{`€${prizes[0]}`}</div>}
            { (rank === 2 && ((type === 'b') || (type === 'c'))) && <img src={SilverTrophy} alt="trophy" />}
            { (rank === 2 && ((type === 'b') || (type === 'c'))) && <div className={styles.prize}>{`€${prizes[1]}`}</div>}
            { (rank === 3 && (type === 'c')) && <img src={BronzeTrophy} alt="trophy" />}
            { (rank === 3 && (type === 'c')) && <div className={styles.prize}>{`€${prizes[2]}`}</div>}
            <div className={styles.score}>
              <p>{currentScore}</p>
              <p style={{ fontSize: '10px' }}>PTS</p>
            </div>
          </motion.div>
          <motion.img
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 4.4 + (rank * 0.25) }}
            animate={{ opacity: [0.5, 1], scale: [1.1, 1] }}
            src={DownArrow}
            alt="Down Arrow"
            className={styles.down_arrow}
          />
        </motion.div>
      </motion.div>
      { isActive && <UserBets matches={matches} user={user} />}
    </>
  );
};

// START NEXT -> ADD USER BETS & FAKE_USER BETS AND TABLE IS D O N E(!)

const Leaderboard = ({ activeTable, availableMatches }) => {
  const {
    name,
    description,
    players,
    prizePool,
    leagues,
    type,
    matches,
    users,
  } = activeTable;
  const filteredMatches = availableMatches.matches.filter((match) => matches.includes(match.id));
  let aPrecentage;
  if (type === 'a') {
    aPrecentage = '100%';
  } else if (type === 'b') {
    aPrecentage = '70%';
  } else {
    aPrecentage = '50%';
  }
  const sortedUsers = [...users];
  sortedUsers.sort((a, b) => a.currentScore - b.currentScore);
  let calculatedPrizes;
  if (type === 'a') {
    calculatedPrizes = [prizePool];
  } else if (type === 'b') {
    calculatedPrizes = [Math.round(prizePool / 100 * 70), Math.round(prizePool / 100 * 30)];
  } else {
    calculatedPrizes = [Math.round(prizePool / 100 * 50), Math.round(prizePool / 100 * 30), Math.round(prizePool / 100 * 20)];
  }
  return (
    <div className={styles.container}>
      <div className={styles.top_bg_container}>
        <div className={styles.main_img}>
          <img src={LeagueAvatar} alt="League_Avatar" />
        </div>
        <div className={styles.info_container}>
          <div className={styles.title}>
            {name}
          </div>
          <p>
            {description}
          </p>
          <div className={styles.data_container}>
            <div className={styles.players}>
              {players}
              <img
                src={Players}
                alt="Players"
              />
            </div>
            <div className={styles.prize}>
              {`€${prizePool}`}
            </div>
            <div className={styles.type}>
              <div className={styles.trophy}>
                <img src={GoldTrophy} alt="First" />
                {`${aPrecentage}`}
              </div>
              { (type === 'b' || type === 'c') && (
                <div className={styles.trophy}>
                  <img src={SilverTrophy} alt="Sec" />
                  30%
                </div>
              ) }
              { (type === 'c') && (
                <div className={styles.trophy}>
                  <img src={BronzeTrophy} alt="Third" />
                  20%
                </div>
              ) }
            </div>
          </div>
          <div className={styles.leagues_container}>
            {leagues.map((leauge) => (
              <img src={getLeagueImage(leauge)} alt={`${leauge}_icon`} style={{ width: '15px' }} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.users_container}>
        {sortedUsers.map((user, index) => {
          const x = 5;
          return (
            <User
              matches={filteredMatches}
              rank={index + 1}
              user={user}
              prizes={calculatedPrizes}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
