import React, { useState } from 'react';
// Images
import BeatemHomeTitle from '../../static/images/icons/beatemhometitle.png';
import Home from '../../static/images/icons/home.svg';
import Menu from '../../static/images/icons/menu.svg';
import Messages from '../../static/images/icons/messages.svg';
import Trophy from '../../static/images/icons/Trophy.svg';
import ActiveStar from '../../static/images/icons/ActiveStar.png';
import Star from '../../static/images/icons/Star.png';
import HomeGrey from '../../static/images/icons/HomeGrey.svg';
import ProfileGrey from '../../static/images/icons/ProfileGrey.svg';
import TrophyGrey from '../../static/images/icons/TrophyGrey.svg';
import AchievementsGrey from '../../static/images/icons/AchievementsGrey.svg';
import CreateGrey from '../../static/images/icons/CreateGrey.svg';
import JoinGrey from '../../static/images/icons/JoinGrey.svg';
import SpecialsGrey from '../../static/images/icons/SpecialsGrey.svg';
import InfoGrey from '../../static/images/icons/InfoGrey.svg';
import NotificationsGrey from '../../static/images/icons/NotificationsGrey.svg';
import FriendsGrey from '../../static/images/icons/FriendsGrey.svg';
import ContactGrey from '../../static/images/icons/ContactGrey.svg';
import FAQGrey from '../../static/images/icons/FAQGrey.svg';
import LegalGrey from '../../static/images/icons/LegalGrey.svg';
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
const getMenuItemIcon = (name) => {
  switch (name) {
    case 'Home':
      return HomeGrey;
    case 'Profile':
      return ProfileGrey;
    case 'My Leagues':
      return TrophyGrey;
    case 'Achievements':
      return AchievementsGrey;
    case 'Create League':
      return CreateGrey;
      case 'Messages':
      return Messages;
    case 'Join League':
      return JoinGrey;
    case 'Specials':
      return SpecialsGrey;
    case 'How It Works?':
      return InfoGrey;
    case 'Notifications':
      return NotificationsGrey;
    case 'Friends':
      return FriendsGrey;
    case 'Contact':
      return ContactGrey;
    case 'FAQ':
      return FAQGrey;
    case 'Legal':
      return LegalGrey;
    default:
      return 0;
  }
};

const getBalance = (balance) => {
  const formattedBalance = formatter.format(balance);
  return formattedBalance.slice(0, formattedBalance.length - 3);
};

// ----- Help Components ----- //
const Notifications = ({ count, onMenu }) => {
  const x = 5;
  return (
    <div className={classnames(styles.notifications, { [styles.on_menu]: onMenu })}>
      {count}
    </div>
  );
};

const HeaderProfile = ({ signOut, user, onClick }) => {
  const { score, balance, profilePicture } = user;
  return (
    <div onClick={() => onClick()} className={styles.header_profile_container}>
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
      <span className={styles.rank_name}>{rank.toUpperCase()}</span>
      {Stars(activeStars)}
    </div>
  );
};

const MenuItem = ({ name, onClick, notifications }) => {
  const x = 5;
  return (
    <motion.div
      whileTap={{
        backgroundColor: '#e8e8e8',
        transition: { duration: 0.3, ease: 'easeInOut' },
      }}
      className={styles.menu_item_container}
      onClick={() => onClick()}
    >
      <img src={getMenuItemIcon(name)} alt={`${name}_img`} className={styles.icon} />
      <span className={styles.menu_item_name}>{name}</span>
      { notifications !== 0 && <Notifications onMenu count={notifications} />}
    </motion.div>
  );
};

const UserMenu = ({
  user, history, close, isOpen, signOut, isLoggedIn,
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
  if (isOpen && !isLoggedIn) {
    close();
    history.push('/login');
    return <> </>;
  }
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
          drag="x"
          dragConstraints={{ left: 0, right: 250 }}
          dragElastic={0}
          onDragEnd={() => close()}
          animate="opened"
          initial="closed"
          exit="closed"
          variants={variants}
          transition={{ type: 'spring', damping: 20 }}
          className={styles.user_menu_container}
        >
          {/* Top Part */}
          <div className={styles.user_menu_top}>
            <div className={styles.top_menu_wrapper}>
              <img src={profilePicture} alt="USER_AVATAR" className={styles.menu_avatar} />
              <div className={styles.info_container}>
                <span className={styles.name}>{name}</span>
                <div className={styles.stats_container}>
                  <div className={styles.balance}>
                    {getBalance(balance)}
                  </div>
                  <div className={styles.score}>
                    <p style={{ margin: '0 2px 0 0' }}>{score}</p>
                    <p style={{ fontSize: '8px' }}>PTS</p>
                  </div>
                </div>
                <Rank rank={rank} />
              </div>
            </div>
          </div>
          {/* Bottom Part */}
          <div className={styles.user_menu_bottom}>
            <MenuItem name="Home" notifications={0} onClick={() => { history.push('/'); close(); }} />
            <MenuItem name="Profile" notifications={0} onClick={() => { history.push('/profile'); close(); }} />
            <MenuItem name="My Leagues" notifications={0} />
            <MenuItem name="Messages" notifications={0} />
            <MenuItem name="Achievements" notifications={1} />
            <MenuItem name="Create League" notifications={0} />
            <MenuItem name="Join League" notifications={0} />
            <MenuItem name="Specials" notifications={0} />
            <MenuItem name="How It Works?" notifications={0} />
            <MenuItem name="Notifications" notifications={3} />
            <MenuItem name="Friends" notifications={0} onClick={() => alert('FRIENDS')} />
            <MenuItem name="Contact" notifications={0} onClick={() => alert('CONTACT')} />
            <MenuItem name="FAQ" notifications={0} onClick={() => alert('FAQ')} />
            <MenuItem name="Legal" notifications={0} onClick={() => alert('LEGAL')} />
            <div onClick={() => { signOut(); close(); }} className={styles.sign_out}>
              LOG OUT
            </div>
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
  const { notifications } = user;
  const controls = useAnimation();
  controls.start({
    opacity: [0, 1],
    transiton: { duration: 0.3, ease: 'easeIn' },
  });
  return (
    <>
      <UserMenu
        isLoggedIn={isLoggedIn}
        signOut={() => signOut()}
        isOpen={isMenuOpen}
        close={() => toggleMenu(false)}
        user={user}
        history={history}
      />
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transiton={{ duration: 0.3, ease: 'easeIn' }}
        className={classnames(styles.header_container, {
          [styles.soccer]: currentSport === 'soccer',
          [styles.basketball]: currentSport === 'basketball',
          [styles.baseball]: currentSport === 'baseball',
          [styles.football]: currentSport === 'football',
          [styles.hockey]: currentSport === 'hockey',
        })}
      >
        <img
          onClick={() => history.push({ pathname: '/', state: { resetHome: true } })}
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
            : <HeaderProfile onClick={() => history.push('/profile')} user={user} />}
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
            onClick={() => history.push({ pathname: '/', state: { resetHome: true } })}
          />
          <div className={styles.menu_icon_container}>
            { !!notifications && <Notifications count={notifications} />}
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
