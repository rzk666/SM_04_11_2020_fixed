import React from 'react';
// Components
import SportsBar from '../components/Home/SportsBar';
import HomeFooter from '../components/Home/HomeFooter';
import HomeLeagues from '../components/Home/HomeLeagues';
import { Input } from 'semantic-ui-react';
// Images
import RightArrow from '../static/images/icons/rightarrow.svg';
// Animations
import { motion, useAnimation } from 'framer-motion';
// Util
import classnames from 'classnames';
// Styles
import styles from './HomeView.module.scss';

// ----- App Components ----- //
const Card = ({ type, onClick }) => {
  const control = useAnimation();
  const textTitle = type === 'create'
    ? 'Create League'
    : 'Join League';
  const textBody = type === 'create'
    ? 'Create your own league and challange your friends'
    : 'Join a friend\'s league and show \'em who\'s the boss';
  return (
    <motion.div animate={control} onClick={() => control.start({ scale: [0.95, 1], transition: { duration: 0.25, ease: 'linear' } })} className={styles.card_container}>
      <div className={styles.divider} />
      <div className={styles.text_container}>
        <div className={styles.text_title}>{textTitle}</div>
        <div className={styles.text_body}>
          {textBody}
        </div>
      </div>
      <img
        src={RightArrow}
        alt={`${type}_Right_Arrow`}
      />
    </motion.div>
  );
};

const HomeView = ({
  login,
  handleSearchChange,
  leaguesSearch,
  currentSport,
  changeSport,
}) => (
  <div className={styles.wrapper}>
    <SportsBar currentSport={currentSport} changeSport={(sport) => changeSport(sport)} />
    <div className={styles.top_banner}>
      <div className={classnames(styles.banner_title, 'white_text_1')}>
        JOIN OR CREATE YOUR OWN LEAGUES!
      </div>
      <div className={styles.buttons_container}>
        <Card type="create" />
        <Card type="join" />
      </div>
    </div>
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
    <HomeFooter />
  </div>
);

export default HomeView;
