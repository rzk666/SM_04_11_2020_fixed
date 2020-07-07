import React from 'react';
// Animations
import { motion } from 'framer-motion';
// Components
// Styles
import styles from './ProfileView.module.scss';
// Images
import Trophy from '../static/images/profile/ProfileTrophy.svg';
import Stars from '../static/images/profile/ProfileStars.svg';
import RightArrow from '../static/images/icons/RightArrowWhite.svg';
// import Currency from '../static/images/profile/Currency.svg';

// ----- Consts & Dicts ----- //
const VIEWS = ['STATS', 'ACHIEVEMENTS', 'FRIENDS'];

// ----- Help Functions ----- //
const formatter = new Intl.NumberFormat('en-GB',
  {
    style: 'currency',
    currency: 'EUR',
  });

const getUnderbarX = (viewIndex) => {
  const underbarWidth = 324 / 3;
  return viewIndex * underbarWidth;
};

const getStatName = (stat) => {
  switch (stat) {
    case 'totalWins':
      return 'TOTAL WINS';
    case 'accuracyRate':
      return 'ACCURACY RATE';
    case 'leaguesPlayed':
      return 'LEAGUES PLAYED';
    case 'privateLeagues':
      return 'PRIVATE LEAGUES';
    case 'friendsPlaying':
      return 'FRIENDS PLAYING';
    case 'firstPlace':
      return 'FIRST PLACE';
    case 'secondPlace':
      return 'SECOND PLACE';
    case 'thirdPlace':
      return 'THIRD PLACE';
    case 'score':
      return 'SCORE';
    default:
      return 0;
  }
};

const Highlight = ({ delay, img, data }) => {
  const x = 5;
  return (
    <div className={styles.highlight}>
      <motion.img
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: -30, opacity: 0 }}
        transition={{ duration: 0.5, delay }}
        src={img}
        alt={`${img}_highlight`}
        className={styles.hightlight_icon}
      />
      <motion.div
        transition={{ duration: 1, delay }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {data}
      </motion.div>
    </div>
  );
};

const StatsHightlight = ({ balance, score, stats }) => {
  const { totalWins } = stats;
  let formattedBalance = formatter.format(balance);
  formattedBalance = formattedBalance.substr(1);
  formattedBalance = formattedBalance.slice(0, -3);
  return (
    <div className={styles.highlights_container}>
      <Highlight delay={0.2} img={Trophy} data={totalWins} />
      <Highlight delay={0.4} img={Stars} data={score} />
      <Highlight delay={0.6} img={Stars} data={formattedBalance} />
    </div>
  );
};

const ProfileTop = ({ user }) => {
  const {
    name, stats, profilePicture, balance, score,
  } = user;
  return (
    <div className={styles.profile_top_container}>
      <img
        src={profilePicture}
        alt={`${name}_profile_img`}
        className={styles.profile_image}
      />
      <span className={styles.user_name}>{name}</span>
      {/* <img
        src="background"
        alt="bg"
        className={styles.profile_bg}
      /> */}
      <StatsHightlight balance={balance} score={score} stats={stats} />
    </div>
  );
};

const DataViewBar = ({ currentView, updateView }) => {
  const viewIndex = VIEWS.indexOf(currentView);
  const animateUnderbar = {
    x: getUnderbarX(viewIndex),
    backgroundColor: '#57bb78',
  };
  return (
    <div className={styles.data_view_bar_container}>
      <motion.div
        animate={animateUnderbar}
        transition={{ type: 'spring', damping: 20 }}
        className={styles.underbar}
      />
      {VIEWS.map((view, i) => (
        <div
          key={`${view}_${i}`}
          className={styles.data_view_top_button_container}
          onClick={() => updateView(view)}
        >
          <span style={{ color: currentView === view ? 'var(--main-solid-green)' : '#53575a' }} className={styles.data_top_bar_text}>
            {view}
          </span>
        </div>
      ))}
    </div>
  );
};

const StatsView = ({ user }) => {
  const { stats } = user;
  return (
    <div className={styles.stats_view_container}>
      <div className={styles.stats_container}>
        {Object.keys(stats).map((stat) => {
          const x = 5;
          return (
            <div className={styles.stat_container}>
              <span className={styles.stat_data}>{stats[stat]}</span>
              <span className={styles.stat_text}>{getStatName(stat)}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.compare_btn}>
        <img
          src={RightArrow}
          alt="Compare Arrow"
          className={styles.right_arrow}
        />
        COMPARE WITH FRIENDS
      </div>
    </div>
  );
};

const AchievementsView = ({ user }) => {
  const x = 5;
  return (
    <div className={styles.stats_view_container}>
      ACHIEVEMENTS
    </div>
  );
};

const FriendsView = ({ user }) => {
  const x = 5;
  return (
    <div className={styles.stats_view_container}>
      FRIENDS
    </div>
  );
};

const getCurrentView = (currentView, user) => {
  switch (currentView) {
    case 'STATS':
      return <StatsView user={user} />;
    case 'ACHIEVEMENTS':
      return <AchievementsView user={user} />;
    case 'FRIENDS':
      return <FriendsView user={user} />;
    default:
      return 0;
  }
};

const DataView = ({ user, currentView, updateView }) => (
  <div className={styles.data_view_container}>
    <DataViewBar
      updateView={(view) => updateView(view)}
      currentView={currentView}
    />
    {getCurrentView(currentView, user)}
  </div>
);
const ProfileView = ({
  auth,
  currentView,
  updateView,
}) => {
  const { user } = auth;
  return (
    <>
      <div className={styles.wrapper}>
        <ProfileTop user={user} />
        <div className={styles.bottom_bg}>
          <DataView
            user={user}
            currentView={currentView}
            updateView={(view) => updateView(view)}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileView;
