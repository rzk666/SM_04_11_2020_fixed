import React from 'react';
// Images
import BeatemHomeTitle from '../../static/images/icons/beatemhometitle.png';
import Home from '../../static/images/icons/home.svg';
import Menu from '../../static/images/icons/menu.svg';
// Animations
import { motion, useAnimation } from 'framer-motion';
// Util
import classnames from 'classnames';
// Styles
import styles from './Header.module.scss';

const Header = ({ auth, currentSport }) => {
  const { isLoggedIn } = auth;
  const controls = useAnimation();
  controls.start({
    opacity: [0, 1],
    transiton: { duration: 0.3, ease: 'easeIn' },
  });
  return (
    <motion.div
      animate={controls}
      className={classnames(styles.header_container, {
        [styles.soccer]: currentSport === 'soccer',
        [styles.basketball]: currentSport === 'basketball',
        [styles.baseball]: currentSport === 'baseball',
        [styles.football]: currentSport === 'football',
        [styles.hockey]: currentSport === 'hockey',
      })}
    >
      <img
        src={BeatemHomeTitle}
        alt="TITLE_HOME"
        className={styles.title_img}
      />
      <div className={styles.menu_container}>
        <div className={styles.login} onClick={() => alert('login')}>
          Login
        </div>
        <img
          src={Home}
          alt="HOME_ICON"
          className={styles.home}
        />
        <img
          src={Menu}
          alt="HOME_MENU"
          className={styles.menu}
        />
      </div>
    </motion.div>
  );
};

export default Header;
