import React from 'react';
// Images
import PlayerIcon from '../../static/images/joinleague/player.svg';
import SoccerIcon from '../../static/images/joinleague/soccer.svg';
import TrophyIcon from '../../static/images/joinleague/trophy.svg';
import PlusIcon from '../../static/images/joinleague/plus.svg';
// Animations
import { motion } from 'framer-motion';
// Styles
import styles from './JoinCard.module.scss';

const TopBar = ({ players, matches }) => (
  <div className={styles.top_bar_container}>
    <img
      src={PlayerIcon}
      style={{ height: '9.5px', marginLeft: '9.5px', marginRight: '5.5px' }}
      alt="players_icon"
    />
    <div style={{ marginRight: '10px' }}>
      {`${players} Players`}
    </div>
    <img
      src={SoccerIcon}
      style={{ height: '12.7px', marginRight: '5.5px' }}
      alt="soccer_icon"
    />
    {`${matches} Matches`}
  </div>
);

const Middle = ({ maxPrice }) => (
  <div className={styles.middle_container}>
    <img
      src={TrophyIcon}
      alt="Trophy"
      style={{ width: '31px' }}
    />
    <div className={styles.max_prize_container}>
      <p>Max Prize</p>
      <div className={styles.max_prize}>
        {`${maxPrice}€`}
      </div>
    </div>
    <div className={styles.btn_container}>
      <img
        src={PlusIcon}
        alt="Plus"
        style={{ marginRight: '2px' }}
      />
      JOIN
    </div>
  </div>
);

const Footer = ({ createdBy }) => (
  <div className={styles.footer_container}>
    <p>
      Created by
      <b>
        {' '}
        {createdBy}
      </b>
    </p>
  </div>
);

const JoinCard = ({
  onClick, players, matches, currentPrice,
}) => {
  const x = 5;
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className={styles.container}
      onClick={() => onClick()}
    >
      <motion.div
        transition={{ delay: 0.55, duration: 1, ease: 'linear' }}
        animate={{
          x: 160,
          boxShadow: [
            '0px 0px 25px 25px rgba(255,255,255,0)',
            '0px 0px 25px 25px rgba(255,255,255,0.65)',
            '0px 0px 25px 25px rgba(255,255,255,0)'],
        }}
        className={styles.flash}
      />
      <TopBar players={players} matches={matches} />
      <Middle maxPrice={players * currentPrice} />
      <Footer createdBy={'Beat\'em'} />
    </motion.div>
  );
};

export default JoinCard;
