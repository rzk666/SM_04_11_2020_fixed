import React from 'react';
// Styles
import styles from './SportsBar.module.scss';
// Animations
import { motion } from 'framer-motion';
// Images
import Hockey from '../../static/images/icons/hockey.svg';
import HockeyColored from '../../static/images/icons/hockeycolored.svg';
import Football from '../../static/images/icons/football.svg';
import FootballColored from '../../static/images/icons/footballcolored.svg';
import Soccer from '../../static/images/icons/soccer.svg';
import SoccerColored from '../../static/images/icons/soccercolored.svg';
import Basketball from '../../static/images/icons/basketball.svg';
import BasketballColored from '../../static/images/icons/basketballcolored.svg';
import Baseball from '../../static/images/icons/baseball.svg';
import BaseballColored from '../../static/images/icons/baseballcolored.svg';

// ----- Dicts & Consts ----- //
const SPORTS = ['soccer', 'basketball', 'football', 'baseball', 'hockey'];

// ----- Help Functions ----- //
const getUnderbarX = (sportIndex) => {
  const underbarWidth = window.innerWidth / 5;
  return sportIndex * underbarWidth;
};

const getSportImage = (sport, isActive) => {
  switch (sport) {
    case 'soccer':
      return isActive ? SoccerColored : Soccer;
    case 'basketball':
      return isActive ? BasketballColored : Basketball;
    case 'football':
      return isActive ? FootballColored : Football;
    case 'baseball':
      return isActive ? BaseballColored : Baseball;
    case 'hockey':
      return isActive ? HockeyColored : Hockey;
    default:
      return 0;
  }
};

const getUnderbarColor = (sport) => {
  switch (sport) {
    case 'soccer':
      return '#57bb78';
    case 'basketball':
      return '#ff9000';
    case 'football':
      return '#2970be';
    case 'baseball':
      return '#b2c4c3';
    case 'hockey':
      return '#3ddde1';
    default:
      return 0;
  }
};

const SportsBar = ({ currentSport, changeSport }) => {
  const sportIndex = SPORTS.indexOf(currentSport);
  const animateUnderbar = {
    x: getUnderbarX(sportIndex),
    backgroundColor: getUnderbarColor(currentSport),
  };
  return (
    <div className={styles.sportsbar_container}>
      <motion.div
        animate={animateUnderbar}
        className={styles.underbar}
      />
      {SPORTS.map((sport, i) => (
        <div
          key={`${sport}_${i}`}
          className={styles.sports_container}
          onClick={() => changeSport(sport)}
        >
          <img
            src={getSportImage(sport, sport === currentSport)}
            alt={`${sport}_icon`}
          />
        </div>
      ))}
    </div>
  );
};

export default SportsBar;
