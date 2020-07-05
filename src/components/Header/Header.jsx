import React from 'react';
// Images
import BeatemHomeTitle from '../../static/images/icons/beatemhometitle.png';
import Home from '../../static/images/icons/home.svg';
import Menu from '../../static/images/icons/menu.svg';
import Trophy from '../../static/images/icons/Trophy.svg';
// Animations
import { motion, useAnimation } from 'framer-motion';
// Util
import classnames from 'classnames';
// Universal
import pages from '../../universal/pages';
// Styles
import styles from './Header.module.scss';
import { signOut } from '../../redux/models/auth/authActions';

// ----- Consts & Dicts ----- //
const { LOGIN } = pages;

// ----- Help Components ----- //
const Notifications = ({ count }) => {
  const x = 5;
  return (
    <div className={styles.notifications}>
      {count}
    </div>
  );
};

const HeaderProfile = ({ signOut }) => {
  const x = 5;
  return (
    <div onClick={() => signOut()} className={styles.header_profile_container}>
      signout
    </div>
  );
};

const Header = ({
  auth, currentSport, history, signOut,
}) => {
  const { isLoggedIn, user, isLoading } = auth;
  const { notifications, name } = user;
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
        { !isLoggedIn ? (
          <div className={styles.login} onClick={() => history.push(`/${LOGIN}/`)}>
            Login
          </div>
        )
          : <HeaderProfile signOut={() => signOut()} />}
        { isLoggedIn && (
          <img
            src={Trophy}
            alt="TROPHY_ICON"
            className={styles.home}
          />
        )}
        <img
          src={Home}
          alt="HOME_ICON"
          className={styles.home}
        />
        <div className={styles.menu_icon_container}>
          { notifications !== 0 && <Notifications count={notifications} />}
          <img
            src={Menu}
            alt="HOME_MENU"
            className={styles.menu}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
