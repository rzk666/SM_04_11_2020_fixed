import React from 'react';
// Components
import SportsBar from '../components/Home/SportsBar';
import HomeFooter from '../components/Home/HomeFooter';
import HomeLeagues from '../components/Home/HomeLeagues';
import CreateLeague from '../components/CreateLeague/CreateLeague';
import { Input } from 'semantic-ui-react';
// Images
import RightArrowGreen from '../static/images/icons/RightArrowGreen.svg';
import RightArrowRed from '../static/images/icons/RightArrowRed.svg';
import RightArrowGrey from '../static/images/icons/RightArrowGrey.svg';
import RightArrowOrange from '../static/images/icons/RightArrowOrange.svg';
import RightArrowCyan from '../static/images/icons/RightArrowCyan.svg';
import SoccerTopBanner from '../static/images/home/SoccerTopBanner.png';
import HockeyTopBanner from '../static/images/home/HockeyTopBanner.png';
import FootballTopBanner from '../static/images/home/FootballTopBanner.png';
import BaseballTopBanner from '../static/images/home/BaseballTopBanner.png';
import BasketballTopBanner from '../static/images/home/BasketballTopBanner.png';
// Animations
import {
  motion, useAnimation, AnimatePresence,
} from 'framer-motion';
// Util
import classnames from 'classnames';
// Universal
import pages from '../universal/pages';
// Styles
import styles from './HomeView.module.scss';

// ----- Consts & Dicts ----- //
const { JOIN_LEAGUE } = pages;

// ----- Help Functions ----- //
const getTopBanner = (sport) => {
  switch (sport) {
    case 'soccer':
      return SoccerTopBanner;
    case 'basketball':
      return BasketballTopBanner;
    case 'football':
      return FootballTopBanner;
    case 'baseball':
      return BaseballTopBanner;
    case 'hockey':
      return HockeyTopBanner;
    default:
      return 0;
  }
};

// ----- App Components ----- //
const Card = ({ type, currentSport, onClick }) => {
  const getArrow = (sport) => {
    switch (sport) {
      case 'soccer':
        return RightArrowGreen;
      case 'basketball':
        return RightArrowOrange;
      case 'football':
        return RightArrowRed;
      case 'baseball':
        return RightArrowGrey;
      case 'hockey':
        return RightArrowCyan;
      default:
        return 0;
    }
  };
  const textTitle = type === 'create'
    ? 'Create League'
    : 'Join League';
  const textBody = type === 'create'
    ? 'Create your own league and challange your friends'
    : 'Join a friend\'s league and show \'em who\'s the boss';
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className={styles.card_container}
      onClick={() => onClick()}
    >
      <div className={classnames(styles.divider, styles[currentSport])} />
      <div className={styles.text_container}>
        <div className={styles.text_title}>{textTitle}</div>
        <div className={styles.text_body}>
          {textBody}
        </div>
      </div>
      <img
        src={getArrow(currentSport)}
        alt={`${type}_Right_Arrow`}
      />
    </motion.div>
  );
};

const HomeView = ({
  handleSearchChange,
  leaguesSearch,
  currentSport,
  changeSport,
  creatingLeague,
  toggleLeagueCreation,
  history,
  auth,
}) => {
  const controls = useAnimation();
  const { user } = auth;
  if (!creatingLeague) {
    controls.start({
      opacity: [0, 1],
      transiton: { duration: 0.3, ease: 'easeIn' },
    });
  }
  return (
    <div className={styles.wrapper}>
      <SportsBar currentSport={currentSport} changeSport={(sport) => changeSport(sport)} />
      { creatingLeague ? <CreateLeague user={user} />
        : (
          <>
            <AnimatePresence initial={false}>
              <div
                className={styles.top_banner}
              >
                <motion.img
                  className={styles.top_banner_image}
                  src={getTopBanner(currentSport)}
                  alt={`${currentSport}_top_banner`}
                  key={`${currentSport}_animated_top_banner`}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  transiton={{ duration: 0.15, ease: 'easeIn' }}
                  exit={{ opacity: 0 }}
                />
                <div className={classnames(styles.banner_title, 'white_text_1')}>
                  JOIN OR CREATE YOUR OWN LEAGUES!
                </div>
                <div className={styles.buttons_container}>
                  <Card onClick={() => toggleLeagueCreation()} currentSport={currentSport} type="create" />
                  <Card onClick={() => history.push(JOIN_LEAGUE)} currentSport={currentSport} type="join" />
                </div>
              </div>
            </AnimatePresence>
            <div className={classnames(styles.compete_text, 'grey_text_1')}>
              COMPETE WITH PLAYERS ALL AROUND THE WORLD!
              CHOOSE A LEAGUE, PICK YOUR BET AND BEAT'EM ALL
            </div>
            <Input
              icon="search"
              iconPosition="left"
              placeholder="Search League"
              className={styles.search}
              onChange={(e, data) => handleSearchChange(data.value)}
              value={leaguesSearch}
            />
            <HomeLeagues currentSport={currentSport} leaguesSearch={leaguesSearch} />
            <HomeFooter currentSport={currentSport} />
          </>
        )}
    </div>
  );
};

export default HomeView;
