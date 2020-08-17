import React from 'react';
import { useHistory } from 'react-router-dom';
// Components
import SportsBar from '../components/Home/SportsBar';
import HomeFooter from '../components/Home/HomeFooter';
import HomeLeagues from '../components/Home/HomeLeagues';
import CreateLeague from '../components/CreateLeague/CreateLeague';
import { Input } from 'semantic-ui-react';
// Images
import RightArrowGreen from '../static/images/icons/RightArrowGreen.svg';
import ExitIcon from '../static/images/icons/Exit.svg';
import RightArrowRed from '../static/images/icons/RightArrowRed.svg';
import RightArrowGrey from '../static/images/icons/RightArrowGrey.svg';
import RightArrowOrange from '../static/images/icons/RightArrowOrange.svg';
import RightArrowCyan from '../static/images/icons/RightArrowCyan.svg';
import Player from '../static/images/joinleague/player.svg';
import Soccer from '../static/images/joinleague/soccer.svg';
import Plus from '../static/images/joinleague/plus.svg';
import Friends from '../static/images/joinleague/Friends.png';
import Trophy from '../static/images/joinleague/trophy.svg';
import Info from '../static/images/icons/InfoGrey.svg';
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
const LEAGUE_VIEW_GAMES = [
  {
    name: 'Razi\'s League',
    description: 'Best league in the world',
    players: 9,
    matches: 6,
    betSize: 30,
    invitedBy: 'Razi',
  }, {
    name: 'Barak\'s League',
    description: 'This league is really great',
    players: 8,
    matches: 8,
    betSize: 30,
    invitedBy: 'Barak',
  }, {
    name: 'Tal\'s League',
    description: 'This is a beatem league of friends and it is a really great league',
    players: 5,
    matches: 12,
    betSize: 15,
    invitedBy: 'Tal',
  }];

const JoinLeagueCard = ({
  name, players, matches, description, betSize, invitedBy, joinTable,
}) => {
  const history = useHistory();
  return (
    <motion.div onClick={() => { joinTable(); history.push('/table'); }} whileTap={{ scale: 0.9 }} className={styles.card_container}>
      <div className={styles.top_row}>
        <div className={styles.stats}>
          <div className={styles.players}>
            <img
              src={Player}
              alt="Players"
              style={{ marginRight: '5px' }}
            />
            {`${players} Players`}
          </div>
          <div className={styles.matches}>
            <img
              src={Soccer}
              alt="Matches"
              style={{ marginRight: '5px' }}
            />
            {`${matches} Matches`}
          </div>
        </div>
        <img src={Info} alt="Info" className={styles.info} />
      </div>
      <div className={styles.middle}>
        <img src={Friends} alt="Friends" className={styles.friends} />
        <div className={styles.card_text}>
          <span className={styles.card_title}>{name}</span>
          <span className={styles.card_description}>{description}</span>
        </div>
        <div className={styles.card_join}>
          <div className={styles.join}>
            <img className={styles.plus} src={Plus} alt="Plus" />
            JOIN
          </div>
          <div className={styles.prize}>
            <img className={styles.trophy} src={Trophy} alt="Trophy" />
            {`${betSize * players}€`}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <span>
          Invited by
          <b style={{ marginLeft: '3px' }}>{invitedBy}</b>
        </span>
      </div>
    </motion.div>
  );
};

const JoinLeagueView = ({ joinTable }) => (
  <div className={styles.join_league_container}>
    <div className={styles.title}>JOIN LEAGUE</div>
    <div className={styles.invites_container}>
      {LEAGUE_VIEW_GAMES.map((league) => {
        const {
          name, players, matches, description, betSize, invitedBy,
        } = league;
        return (
          <JoinLeagueCard
            joinTable={() => joinTable({
              players,
              leagues: ['Premiere League', 'La Liga', 'Champions League'],
              prizePool: betSize * players,
              name,
              description,
              type: 'a',
              matches: [1, 2, 3, 4, 5, 6, 7, 8],
            })}
            name={name}
            players={players}
            matches={matches}
            description={description}
            betSize={betSize}
            invitedBy={invitedBy}
          />
        );
      })}
    </div>
  </div>
);


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
  availableMatches,
  updateActiveTable,
  toggleJoiningLeague,
  joiningLeague,
}) => {
  const controls = useAnimation();
  const { user, isLoggedIn } = auth;
  if (!creatingLeague && !joiningLeague) {
    controls.start({
      opacity: [0, 1],
      transiton: { duration: 0.3, ease: 'easeIn' },
    });
  }
  return (
    <div className={styles.wrapper}>
      <SportsBar isActive={!creatingLeague && !joiningLeague} currentSport={currentSport} changeSport={(sport) => changeSport(sport)} />
      { creatingLeague ? (
        <CreateLeague
          updateActiveTable={(data) => updateActiveTable(data, user)}
          history={history}
          availableMatches={availableMatches}
          user={user}
        />
      )
        : (
          <>
            { joiningLeague ? <JoinLeagueView joinTable={(data) => updateActiveTable(data, user)} />
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
                        <Card
                          onClick={() => {
                            if (currentSport !== 'soccer') {
                              alert('Coming Soon...');
                            } else if (!isLoggedIn) {
                              history.push('/login');
                            } else {
                              toggleLeagueCreation();
                            }
                          }}
                          currentSport={currentSport}
                          type="create"
                        />
                        <Card
                          onClick={() => {
                            if (currentSport !== 'soccer') {
                              alert('Coming Soon...');
                            } else {
                              toggleJoiningLeague();
                            }
                          }}
                          currentSport={currentSport}
                          type="join"
                        />
                      </div>
                    </div>
                  </AnimatePresence>
                  <div className={classnames(styles.compete_text, 'grey_text_1')}>
                    COMPETE WITH PLAYERS ALL AROUND THE WORLD!
                    CHOOSE A LEAGUE, PICK YOUR BET AND BEAT'EM ALL
                  </div>
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <img onClick={() => handleSearchChange('')} alt="clean" src={ExitIcon} className={styles.clean} />
                    <Input
                      icon="search"
                      iconPosition="left"
                      placeholder="Search League"
                      className={styles.search}
                      onChange={(e, data) => handleSearchChange(data.value)}
                      value={leaguesSearch}
                    />
                  </div>
                  <HomeLeagues currentSport={currentSport} leaguesSearch={leaguesSearch} />
                  <HomeFooter currentSport={currentSport} />
                </>
              )}
          </>
        )}
    </div>
  );
};

export default HomeView;
