import React from 'react';
// Styles
import styles from './HomeLeagues.module.scss';
// Images
import Premier from '../../static/images/leagues/premier.png';
import brazil from '../../static/images/leagues/brazil.png';
import seriea from '../../static/images/leagues/seriea.png';
import laliga from '../../static/images/leagues/laliga.png';
import bundas from '../../static/images/leagues/bundas.png';
import ligueone from '../../static/images/leagues/ligueone.png';
import ered from '../../static/images/leagues/ered.png';
import ligamx from '../../static/images/leagues/ligamx.png';
import champions from '../../static/images/leagues/champions.png';
// Util
import classnames from 'classnames';
// Animations
import { motion } from 'framer-motion';
// Universal
import LEAGUES from '../../universal/leagues';

// ----- Help Functions ----- //
const getLeagueImage = (league) => {
  switch (league) {
    case 'La Liga':
      return laliga;
    case 'Premier League':
      return Premier;
    case 'Bundasliga':
      return bundas;
    case 'Serie A':
      return seriea;
    case 'Ligue 1':
      return ligueone;
    case 'Eredivisie':
      return ered;
    case 'Liga MX':
      return ligamx;
    case 'Champions League':
      return champions;
    case 'Serie A Brazil':
      return brazil;
    default:
      return Premier;
  }
};

const getLeagueName = (league) => {
  switch (league) {
    case 'La Liga':
      return 'laliga';
    case 'Premier League':
      return 'premier';
    case 'Bundasliga':
      return 'bundas';
    case 'Serie A':
      return 'seriea';
    case 'Ligue 1':
      return 'ligueone';
    case 'Eredivisie':
      return 'ered';
    case 'Liga MX':
      return 'ligamx';
    case 'Champions League':
      return 'champions';
    case 'Serie A Brazil':
      return 'brazil';
    default:
      return 'premier';
  }
};

// ----- Help Componenets ----- //
const EmptyLeagues = () => (
  <div className={classnames(styles.no_leagues, 'grey_text_1')}>
    NO LEAGUES TO DISPLAY
  </div>
);

const HomeLeagues = ({ leaguesSearch, currentSport }) => {
  const filteredLeagues = leaguesSearch ? LEAGUES[currentSport].filter((league) => league.includes(leaguesSearch)) : LEAGUES[currentSport];
  return (
    <div className={styles.leagues_wrapper}>
      <div className={styles.leagues_container}>
        {!filteredLeagues.length ? <EmptyLeagues />
          : (
            <>
              {filteredLeagues.map((league) => (
                <div className={styles.league}>
                  <div className={styles.league_image_container}>
                    <motion.img
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      src={getLeagueImage(league)}
                      alt={`${league}_logo`}
                      className={styles[getLeagueName(league)]}
                    />
                  </div>
                  <div className={classnames(styles.league_name, 'white_text_3')}>
                    {league}
                  </div>
                </div>
              ))}
            </>
          )}
      </div>
    </div>
  );
};

export default HomeLeagues;
