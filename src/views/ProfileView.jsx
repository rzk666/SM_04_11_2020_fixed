import React, { createRef } from 'react';
// Animations
import { motion } from 'framer-motion';
// Components
import { Input } from 'semantic-ui-react';
// Styles
import styles from './ProfileView.module.scss';
// Images
import Trophy from '../static/images/profile/ProfileTrophy.svg';
import ProfileBackground from '../static/images/profile/ProfileBackground.png';
import Stars from '../static/images/profile/ProfileStars.svg';
import RightArrow from '../static/images/icons/RightArrowWhite.svg';
import Messenger from '../static/images/icons/social/Messenger.svg';
// import Currency from '../static/images/profile/Currency.svg';
// Misc
import { USERS } from '../redux/models/auth/authReducer';

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
        src={ProfileBackground}
        alt="ProfileBackground"
        className={styles.profile_background_image}
      />
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
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={styles.compare_btn}
      >
        <img
          src={RightArrow}
          alt="Compare Arrow"
          className={styles.right_arrow}
        />
        COMPARE WITH FRIENDS
      </motion.div>
    </div>
  );
};

const Achievement = ({
  text, dataOne, dataTwo, dataThree,
}) => {
  const x = 5;
  return (
    <div className={styles.achievement_container}>
      <img
        src={Trophy}
        alt="Trop"
        className={styles.img}
      />
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.all_data_container}>
        <div className={styles.single_data_container}>
          <span className={styles.stat_data}>{dataOne.value}</span>
          <span className={styles.stat_text}>{dataOne.text}</span>
        </div>
        <div className={styles.single_data_container}>
          <span className={styles.stat_data}>{dataTwo.value}</span>
          <span className={styles.stat_text}>{dataTwo.text}</span>
        </div>
        <div className={styles.single_data_container}>
          <span className={styles.stat_data}>{dataThree.value}</span>
          <span className={styles.stat_text}>{dataThree.text}</span>
        </div>
      </div>
    </div>
  );
};

const AchievementsView = ({ user }) => {
  const x = 5;
  return (
    <div className={styles.achievements_view_container}>
      <Achievement
        text="Achievement"
        dataOne={{ text: 'Leagues Won', value: 129 }}
        dataTwo={{ text: 'Matches Predicted', value: 531 }}
        dataThree={{ text: 'Total Points', value: 4840 }}
      />
      <div className={styles.divider} />
      <Achievement
        text="Achievement"
        dataOne={{ text: 'Leagues Won', value: 12 }}
        dataTwo={{ text: 'Matches Predicted', value: 68 }}
        dataThree={{ text: 'Total Points', value: 7204 }}
      />
      <div className={styles.divider} />
      <Achievement
        text="Achievement"
        dataOne={{ text: 'Leagues Won', value: 8 }}
        dataTwo={{ text: 'Matches Predicted', value: 45 }}
        dataThree={{ text: 'Bonues Points', value: 6070 }}
      />
      <div className={styles.divider} />
      <div className={styles.achievement_container}>
        <img
          src={Trophy}
          alt="Trop"
        />
        <span className={styles.ach_text_misc}>
          Congrats! You Just Made Your First Bet at Beat'em!
        </span>
      </div>
    </div>
  );
};

const Friend = ({ name, img }) => (
  <>
    <div className={styles.friend_container}>
      <img
        src={img}
        alt={`${name}_avatar`}
        style={{ width: '24px' }}
      />
      <span className={styles.name}>
        {name}
      </span>
      <img
        src={Messenger}
        alt="Messanger_Icon"
        className={styles.messenger_img}
      />
    </div>
    <div className={styles.divider} />
  </>
);

class FriendsView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchFocused: false,
    }
  }

  componentDidUpdate() {
    console.log(this.state.searchFocused);
  }

  componentDidMount() {
    console.log(this.inputRef);
      const input = this.inputRef.current.inputRef.current;
      input.onfocus = () => this.setState({ searchFocused: true});
      input.onblur = () => this.setState({ searchFocused: false});;
      console.log(input);
  }

  inputRef = createRef();

  render() {
    const { user, friendsSearch, handleSearchChange } = this.props;
    const { friends } = user;
    const filteredFriends = friends.filter((friend) => friend.includes(friendsSearch));
    return (
      <div className={styles.friends_view_container}>
        <div className={styles.search_section}>
          <Input
            ref={this.inputRef}
            icon="search"
            iconPosition="left"
            placeholder="Search Friends"
            className={styles.search}
            onChange={(e, data) => handleSearchChange(data.value)}
            value={friendsSearch}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.friends_section}>
          {filteredFriends.length ? filteredFriends.map((friend) => (
            <Friend
              img={USERS[friend].profilePicture}
              name={USERS[friend].name}
            />
          )) : <span className={styles.no_friends}>NO FRIENDS TO DISPLAY</span>}
        </div>
      </div>
    );
  }
}

const getCurrentView = (currentView, user, handleSearchChange, friendsSearch) => {
  switch (currentView) {
    case 'STATS':
      return <StatsView user={user} />;
    case 'ACHIEVEMENTS':
      return <AchievementsView user={user} />;
    case 'FRIENDS':
      return (
        <FriendsView
          handleSearchChange={(value) => handleSearchChange(value)}
          user={user}
          friendsSearch={friendsSearch}
        />
      );
    default:
      return 0;
  }
};

const DataView = ({
  friendsSearch, handleSearchChange, user, currentView, updateView,
}) => (
  <div className={styles.data_view_container}>
    <DataViewBar
      updateView={(view) => updateView(view)}
      currentView={currentView}
    />
    {getCurrentView(currentView, user, handleSearchChange, friendsSearch)}
  </div>
);
const ProfileView = ({
  auth,
  currentView,
  updateView,
  handleSearchChange,
  friendsSearch,
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
            friendsSearch={friendsSearch}
            handleSearchChange={(value) => handleSearchChange(value)}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileView;
