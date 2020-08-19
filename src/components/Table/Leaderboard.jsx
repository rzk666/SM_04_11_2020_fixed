import React, { useState } from 'react';
// Components
import CountUp from 'react-countup';
// Styles
import styles from './Leaderboard.module.scss';
// Images
import FriendsBig from '../../static/images/leaderboard/FriendsBig.png';
import Players from '../../static/images/leaderboard/WhitePlayer.svg';
import GoldTrophy from '../../static/images/leaderboard/GoldTrophy.svg';
import SilverTrophy from '../../static/images/leaderboard/SilverTrophy.svg';
import BronzeTrophy from '../../static/images/leaderboard/BronzeTrophy.svg';
import PremiereLeague from '../../static/images/leagues/premier.png';
import Clock from '../../static/images/icons/clock.png';
import Champions from '../../static/images/leagues/champions.png';
import LaLiga from '../../static/images/leagues/laliga.png';
import DownArrow from '../../static/images/icons/DownArrow.svg';
// Animations
import { motion, AnimatePresence } from 'framer-motion';
// Utils
import classnames from 'classnames';
import { easeOutCubic } from 'js-easing-functions';
import {
  hasBetsChanged,
  calculateTotalScore,
  calculateUserScore,
  calculateMatchScore,
  calculateTotalTime,
  getShortDayName,
  getTeamImage,
} from '../../common/libs';

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

const UserBets = ({ user, matches, isPlayer }) => {
  const sortedMatches = [...matches].sort((a, b) => a.order - b.order);
  const { bets } = user;
  return (
    <div className={styles.bets_container}>
      <div className={styles.title_container}>
        <div className={styles.title}>
          {!sortedMatches.length ? 'No Active Matches' : `${user.name}'s Bets`}
        </div>
      </div>
      {sortedMatches.map((match) => {
        const {
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          matchTime,
          isLocked,
          homeOdds,
          drawOdds,
          awayOdds,
          id,
        } = match;
        const currentBet = bets.find((bet) => (parseInt(bet.matchId) === id));
        const homeBet = currentBet.homeScore;
        const awayBet = currentBet.awayScore;
        let awayTeamName;
        let homeTeamName;
        if (homeTeam === 'Manchester United') {
          homeTeamName = 'Man. Utd';
        } else if (homeTeam === 'Manchester City') {
          homeTeamName = 'Man. City';
        } else {
          homeTeamName = homeTeam;
        }
        if (awayTeam === 'Manchester United') {
          awayTeamName = 'Man. Utd';
        } else if (awayTeam === 'Manchester City') {
          awayTeamName = 'Man. City';
        } else {
          awayTeamName = awayTeam;
        }
        const lockedButNotStarted = isLocked && matchTime === 0;
        return (
          <div className={classnames(styles.match_row, { [styles.hidden]: !isLocked && !isPlayer })}>
            { lockedButNotStarted
              ? (
                <img src={Clock} alt="Locked Match" className={styles.lock} />
              )
              : (
                <div style={matchTime === 0 ? { opacity: 0 } : {}} className={classnames(styles.time, { [styles.ft_ht]: (matchTime === 'FT' || matchTime === 'HT') })}>
                  {matchTime}
                </div>
              )}
            <div className={styles.home_team}>
              {homeTeamName}
              <img src={getTeamImage(homeTeam)} alt="Home Team" className={styles.team_img} />
            </div>
            <div className={classnames(styles.score)}>
              { !isLocked && !isPlayer ? '0 : 0' : `${homeBet} : ${awayBet}`}
            </div>
            <div className={styles.away_team}>
              <img src={getTeamImage(awayTeam)} alt="Home Team" className={styles.team_img} />
              {awayTeamName}
            </div>
            <div className={classnames(styles.points, { [styles.running]: matchTime !== 0 && matchTime !== 'FT' })}>
              <div className={styles.score}>
                <p>
                  { isLocked ? calculateMatchScore(
                    homeScore,
                    homeBet,
                    awayScore,
                    awayBet,
                    homeOdds,
                    awayOdds,
                    drawOdds,
                  ) : 0}
                </p>
                <p style={{ fontSize: '10px' }}>PTS</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const User = ({
  user,
  rank,
  prizes,
  type,
  matches,
  isPlayer,
  totalUsers,
  isRunning,
  toggleActive,
  activeUsers,
  displayUsers,
}) => {
  const totalDelay = 0.85 + totalUsers * 0.1;
  const {
    name, profilePicture, currentScore, previousScore,
  } = user;
  const isActive = activeUsers.includes(name);
  const displayUser = displayUsers.includes(name);
  let isTop = false;
  switch (type) {
    case 'a':
      if (rank === 1) {
        isTop = true;
      }
      break;
    case 'b':
      if (rank === 1 || rank === 2) {
        isTop = true;
      }
      break;
    case 'c':
      if (rank === 1 || rank === 2 || rank === 3) {
        isTop = true;
      }
      break;
    default:
      break;
  }
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
    <AnimatePresence>
      <motion.div
        key={`User_${rank}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', height: '100%' }}
      >
        <div
          style={{ boxShadow: `0 2px 3px 0 ${shadowOne || 'rgba(0,0,0,0)'}` }}
          onClick={() => toggleActive(name)}
          className={classnames(styles.user_row_container,
            {
              [styles.first]: rank === 1,
              [styles.second]: rank === 2,
              [styles.third]: rank === 3,
            })}
        >
          {/* <motion.div
          transition={isTopThree ? {
            delay: 7 + (1 * rank), duration: 3.5, loop: Infinity, repeatDelay: 3.5, ease: 'easeIn',
          } : ''}
          animate={{ opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0] }}
          className={styles.bg_cover}
        /> */}
          {rank}
          <motion.div initial={{ scale: 1.1, width: '86%' }} animate={{ width: '90%', scale: 1 }} transition={{ delay: 0.2 + rank * 0.12, ease: 'easeInOut', duration: 0.5 }} className={styles.user_main_container}>
            <motion.img animate={{ opacity: displayUser ? 1 : 0 }} src={profilePicture} alt={`${name}_img`} className={styles.profile_image} />
            <motion.p animate={{ opacity: displayUser ? 1 : 0 }} style={{ color: mainColor || '#53575a' }} className={styles.name}>{name}</motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 + rank * 0.12 }}
              animate={{ opacity: 1 }}
              className={classnames(styles.prize_score_container, { [styles.not_top]: !isTop })}
            >
              { rank === 1 && <img src={GoldTrophy} alt="trophy" />}
              { rank === 1 && <div className={styles.prize}>{`€${prizes[0]}`}</div>}
              { (rank === 2 && ((type === 'b') || (type === 'c'))) && <img src={SilverTrophy} alt="trophy" />}
              { (rank === 2 && ((type === 'b') || (type === 'c'))) && <div className={styles.prize}>{`€${prizes[1]}`}</div>}
              { (rank === 3 && (type === 'c')) && <img src={BronzeTrophy} alt="trophy" />}
              { (rank === 3 && (type === 'c')) && <div className={styles.prize}>{`€${prizes[2]}`}</div>}
              <motion.div animate={{ opacity: displayUser ? 1 : 0 }} className={styles.score}>
                <p>
                  { isRunning ? (
                    <CountUp
                      easingFn={(elapsed, startPosition, endPosition, duration) => easeOutCubic(elapsed, startPosition, endPosition, duration)}
                      style={{ color: previousScore > currentScore ? '#ff6464' : (previousScore < currentScore ? '#57bb78' : '53575a#') }}
                      start={previousScore}
                      end={currentScore}
                      duration={3}
                    />
                  ) : currentScore}

                </p>
                <p style={{ fontSize: '10px', color: (isRunning && previousScore !== currentScore) ? (previousScore > currentScore) ? '#ff6464' : '#57bb78' : '#53575a' }}>PTS</p>
              </motion.div>
            </motion.div>
            <motion.img
              initial={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 + rank * 0.12 }}
              animate={{ opacity: 1 }}
              src={DownArrow}
              alt="Down Arrow"
              className={styles.down_arrow}
            />
          </motion.div>
        </div>
        { isActive && <UserBets isPlayer={isPlayer} matches={matches} user={user} />}
      </motion.div>
    </AnimatePresence>
  );
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      filteredMatches: [],
      previousTotalScore: 0,
      previousTotalTime: 0,
      currentUsers: props.activeTable.users,
      activeUsers: [],
      displayUsers: props.activeTable.users.map((user) => user.name),
    };
  }

  componentDidMount() {
    const { availableMatches, activeTable } = this.props;
    const { matches } = activeTable;
    const includedMatches = availableMatches.matches.filter((match) => matches.includes(match.id));
    const filteredMatches = includedMatches.filter((match) => match.isLocked);
    this.setState({ filteredMatches });
  }

  componentDidUpdate(prevProps, prevState) {
    const { previousTotalTime, previousTotalScore, currentUsers } = this.state;
    const { availableMatches, activeTable, user } = this.props;
    const { matches } = activeTable;
    // Handle filtered matches first
    const includedMatches = availableMatches.matches.filter((match) => matches.includes(match.id));
    const newFilteredMatches = includedMatches.filter((match) => match.isLocked);
    if (prevState.filteredMatches.length !== newFilteredMatches.length) {
      this.setState({ filteredMatches: newFilteredMatches });
    }
    // Handle score changes -> Will also change currentUsers in state!
    const currentTotalScore = calculateTotalScore(activeTable.users, newFilteredMatches);
    if (currentTotalScore !== previousTotalScore) {
      const newUsersArray = [...currentUsers].map((user) => ({
        ...user,
        previousScore: user.currentScore,
        currentScore: calculateUserScore(user, newFilteredMatches),
      }));
      // Handle running numbers
      setTimeout(() => this.endScoreRun(), 3000);
      this.setState({
        isRunning: true,
        currentUsers: newUsersArray,
        previousTotalScore: currentTotalScore,
        filteredMatches: newFilteredMatches,
      });
    }
    // Handle time change
    const currentTotalTime = calculateTotalTime(newFilteredMatches);
    if (currentTotalTime !== previousTotalTime) {
      this.setState({ previousTotalTime: currentTotalTime, filteredMatches: newFilteredMatches });
    }
    const currentUser = activeTable.users.find((tableUser) => tableUser.name === user.name);
    const { bets } = currentUser;
    const previousUser = prevProps.activeTable.users.find((prevUser) => prevUser.name === user.name);
    const previousBets = previousUser.bets;
    // Hadnle user bets change
    if (hasBetsChanged(previousBets, bets)) {
      console.log('BETS CHANGED');
      this.setState({ currentUsers: activeTable.users });
    }
  }

  sortUsers() {
    const { currentUsers } = this.state;
    this.setState({ displayUsers: [...currentUsers].map((user) => user.name), currentUsers: [...currentUsers].sort((a, b) => b.currentScore - a.currentScore) });
  }

  toggleActiveUser(userName) {
    const { activeUsers } = this.state;
    if (!activeUsers.includes(userName)) {
      this.setState({ activeUsers: [...activeUsers, userName] });
    } else {
      const newUsers = [...activeUsers].filter((user) => user !== userName);
      this.setState({ activeUsers: newUsers });
    }
  }

  endScoreRun() {
    const { currentUsers } = this.state;
    setTimeout(() => this.sortUsers(), 220);
    // const sortedUsers = [...currentUsers].sort((a, b) => b.currentScore - a.currentScore);
    // const usersToRemove = [];
    // sortedUsers.map((user, index) => {
    //   if (user.name !== currentUsers[index].name) {
    //     usersToRemove.push(user.name);
    //   }
    // });
    // const displayUsers = sortedUsers.filter((user) => !usersToRemove.includes(user.name)).map((user) => user.name);
    this.setState({ displayUsers: [], isRunning: false });
  }

  render() {
    const {
      filteredMatches,
      isRunning,
      activeUsers,
      currentUsers,
      displayUsers,
    } = this.state;
    const { activeTable, user, hide } = this.props;
    const {
      name,
      description,
      players,
      prizePool,
      leagues,
      type,
    } = activeTable;
    let calculatedPrizes;
    if (type === 'a') {
      calculatedPrizes = [prizePool];
    } else if (type === 'b') {
      calculatedPrizes = [Math.round(prizePool / 100 * 70), Math.round(prizePool / 100 * 30)];
    } else {
      calculatedPrizes = [Math.round(prizePool / 100 * 50), Math.round(prizePool / 100 * 30), Math.round(prizePool / 100 * 20)];
    }
    return (
      <div style={hide ? { display: 'none' } : {}} className={styles.container}>
        <div className={styles.top_bg_container}>
          <div className={styles.main_img}>
            <img src={FriendsBig} alt="League_Avatar" />
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
              <div className={classnames(styles.type, { [styles.type_c]: type === 'c' })}>
                <div className={styles.trophy}>
                  <img src={GoldTrophy} alt="First" />
                  {/* {`${aPrecentage}`} */}
                </div>
                { (type === 'b' || type === 'c') && (
                <div className={styles.trophy}>
                  <img src={SilverTrophy} alt="Sec" />
                  {/* 30% */}
                </div>
                ) }
                { (type === 'c') && (
                <div className={styles.trophy}>
                  <img src={BronzeTrophy} alt="Third" />
                  {/* 20% */}
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
          {currentUsers.map((currentUser, index) => {
            const x = 5;
            return (
              <User
                displayUsers={displayUsers}
                toggleActive={() => this.toggleActiveUser(currentUser.name)}
                activeUsers={activeUsers}
                isRunning={isRunning}
                totalUsers={currentUsers.length}
                isPlayer={user.name === currentUser.name}
                matches={filteredMatches}
                rank={index + 1}
                user={currentUser}
                prizes={calculatedPrizes}
                type={type}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
