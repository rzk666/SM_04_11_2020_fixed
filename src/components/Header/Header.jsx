import React, { useState } from 'react';
// Images
import BeatemHomeTitle from '../../static/images/icons/beatemhometitle.png';
import Home from '../../static/images/icons/home.svg';
import Menu from '../../static/images/icons/menu.svg';
import Trophy from '../../static/images/icons/Trophy.svg';
import ActiveStar from '../../static/images/icons/ActiveStar.png';
import Star from '../../static/images/icons/Star.png';
// Animations
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
// Util
import classnames from 'classnames';
// Universal
import pages from '../../universal/pages';
// Styles
import styles from './Header.module.scss';

// ----- Consts & Dicts ----- //
const { LOGIN } = pages;
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
});

// ----- Help Function ----- //
const getBalance = (balance) => {
  const formattedBalance = formatter.format(balance);
  return formattedBalance.slice(0, formattedBalance.length - 3);
};

// ----- Help Components ----- //
const Notifications = ({ count }) => {
  const x = 5;
  return (
    <div className={styles.notifications}>
      {count}
    </div>
  );
};

const HeaderProfile = ({ signOut, user }) => {
  const { score, balance, profilePicture } = user;
  return (
    <div className={styles.header_profile_container}>
      <div className={styles.stats_container}>
        <span className={styles.balance}>{getBalance(balance)}</span>
        <span className={styles.score}>{`${score} Points`}</span>
      </div>
      <img
        src={profilePicture}
        alt="User_Avatar"
        className={styles.avatar}
      />
    </div>
  );
};

const Rank = ({ rank }) => {
  let activeStars;
  switch (rank) {
    case 'amateur':
      activeStars = 1;
      break;
    case 'intermediate':
      activeStars = 1;
      break;
    case 'begginer':
      activeStars = 2;
      break;
    case 'advanced':
      activeStars = 3;
      break;
    case 'pro':
      activeStars = 4;
      break;
    case 'legend':
      activeStars = 5;
      break;
    default:
      break;
  }
  const starsArray = [1, 2, 3, 4, 5];
  const Stars = (count) => (
    <div className={styles.stars_container}>
      {starsArray.map((star) => {
        const style = { width: '8px', height: '8px' };
        if (star <= count) {
          return <img style={style} alt={`star_${star}`} src={ActiveStar} />;
        }
        return <img style={style} alt={`star_${star}`} src={Star} />;
      })}
    </div>
  );
  return (
    <div className={styles.rank_container}>
      <span className={styles.rank_name}>{rank}</span>
      {Stars(activeStars)}
    </div>
  );
};

const MenuItem = ({ name, onClick, notifications }) => {
  const x = 5;
  return (
    <div className={styles.menu_item_container}>
      {/* <img src="" alt=""/> */}
      <span className={styles.menu_item_name}>{name}</span>
      { notifications !== 0 && <Notifications count={notifications} />}
    </div>
  );
};

const UserMenu = ({
  user, history, close, isOpen,
}) => {
  const {
    name, profilePicture, score, balance, rank,
  } = user;
  const variants = {
    closed: {
      x: 250,
    },
    opened: {
      x: 0,
    },
  };
  return (
    <>
      <div
        onClick={() => close()}
        className={classnames(styles.user_menu_wrapper, { [styles.closed]: !isOpen })}
      />
      <AnimatePresence>
        { isOpen
        && (
        <motion.div
          animate="opened"
          initial="closed"
          exit="closed"
          variants={variants}
          transition={{ type: 'spring', damping: 20 }}
          className={styles.user_menu_container}
        >
          {/* Top Part */}
          <div className={styles.user_menu_top}>
            <img src="" alt="USER_AVATAR" className={styles.menu_avatar} />
            <div className={styles.info_container}>
              <span className={styles.name}>{name}</span>
              <div className={styles.stats_container}>
                <div className={styles.balance}>
                  {getBalance(balance)}
                </div>
                <div className={styles.score}>
                  {`${score} PTS`}
                </div>
              </div>
              <Rank rank={rank} />
            </div>
          </div>
          {/* Bottom Part */}
          <div className={styles.user_menu_bottom}>
            <MenuItem name="Home" notifications={0} onClick={() => history.push('/')} />
            <MenuItem name="Profile" notifications={0} onClick={() => history.push('/profile')} />
            <MenuItem name="My Leagues" notifications={0} onClick={() => history.push('/profile')} />
            <MenuItem name="Achievements" notifications={1} onClick={() => history.push('/profile')} />
            <MenuItem name="Create League" notifications={0} onClick={() => history.push('/profile')} />
            <MenuItem name="Join League" notifications={0} onClick={() => history.push('/profile')} />
            <MenuItem name="Specials" notifications={0} onClick={() => history.push('/profile')} />
            <MenuItem name="How It Works?" notifications={0} onClick={() => history.push('/profile')} />
            <MenuItem name="Notifications" notifications={3} onClick={() => history.push('/profile')} />
            <MenuItem name="Friends" notifications={0} onClick={() => alert('FRIENDS')} />
            <MenuItem name="Contact" notifications={0} onClick={() => alert('CONTACT')} />
            <MenuItem name="FAQ" notifications={0} onClick={() => alert('FAQ')} />
            <MenuItem name="Legal" notifications={0} onClick={() => alert('LEGAL')} />
          </div>
        </motion.div>
        ) }
      </AnimatePresence>
    </>
  );
};

const Header = ({
  auth, currentSport, history, signOut,
}) => {
  const [isMenuOpen, toggleMenu] = useState(false);
  const { isLoggedIn, user } = auth;
  const { notifications, name } = user;
  const controls = useAnimation();
  controls.start({
    opacity: [0, 1],
    transiton: { duration: 0.3, ease: 'easeIn' },
  });
  return (
    <>
      <UserMenu isOpen={isMenuOpen} close={() => toggleMenu(false)} user={user} />
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
            : <HeaderProfile user={user} />}
          { isLoggedIn && (
          <motion.img
            whileTap={{ scale: 0.8 }}
            src={Trophy}
            alt="TROPHY_ICON"
            className={styles.home}
          />
          )}
          <motion.img
            whileTap={{ scale: 0.8 }}
            src={Home}
            alt="HOME_ICON"
            className={styles.home}
          />
          <div className={styles.menu_icon_container}>
            { notifications !== 0 && <Notifications count={notifications} />}
            <motion.img
              onClick={() => toggleMenu(true)}
              whileTap={{ scale: 0.8 }}
              src={Menu}
              alt="HOME_MENU"
              className={styles.menu}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
