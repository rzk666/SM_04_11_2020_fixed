/* eslint-disable react/no-array-index-key */
import React from 'react';
// Styles
import styles from './HomeLeagues.module.scss';
// ----- Images ----- //
// Hockey //
import NHL from '../../static/images/leagues/hockey/NHL.png';
import KHL from '../../static/images/leagues/hockey/KHL.png';
import SHL from '../../static/images/leagues/hockey/SHL.png';
import Liiga from '../../static/images/leagues/hockey/Liiga.png';
import ELH from '../../static/images/leagues/hockey/ELH.png';
import DEL from '../../static/images/leagues/hockey/DEL.png';
import National from '../../static/images/leagues/hockey/NationalLeague.png';
import Tipsport from '../../static/images/leagues/hockey/TipsportLiga.png';
import EliteLeague from '../../static/images/leagues/hockey/EliteLeague.png';
// Baseball //
import MajorLeague from '../../static/images/leagues/baseball/MajorLeague.png';
import NPB from '../../static/images/leagues/baseball/NPB.png';
import KBO from '../../static/images/leagues/baseball/KBO.png';
import American from '../../static/images/leagues/baseball/AmericanLeague.png';
import LVBP from '../../static/images/leagues/baseball/LVBP.png';
import LMP from '../../static/images/leagues/baseball/LMP.png';
import CPBL from '../../static/images/leagues/baseball/CPBL.png';
import LCBP from '../../static/images/leagues/baseball/LCBP.png';
import ABL from '../../static/images/leagues/baseball/ABL.png';
// Basketball //
import NBA from '../../static/images/leagues/basket/NBA.png';
import Euroleague from '../../static/images/leagues/basket/Euroleague.png';
import ACB from '../../static/images/leagues/basket/ACB.png';
import GreekBasket from '../../static/images/leagues/basket/GreekBasket.png';
import ChampionsBasket from '../../static/images/leagues/basket/Champions.png';
import NBL from '../../static/images/leagues/basket/NBL.png';
import VTB from '../../static/images/leagues/basket/VTB.png';
import LBA from '../../static/images/leagues/basket/LBA.png';
import CBA from '../../static/images/leagues/basket/CBA.png';
// Football //
import NFL from '../../static/images/leagues/football/NFL.png';
import CFL from '../../static/images/leagues/football/CFL.png';
import LigueElite from '../../static/images/leagues/football/LigueElite.png';
import Russian from '../../static/images/leagues/football/Russian.png';
import College from '../../static/images/leagues/football/College.png';
import GFL from '../../static/images/leagues/football/GFL.png';
import FECOFA from '../../static/images/leagues/football/FECOFA.png';
import LUFA from '../../static/images/leagues/football/LUFA.png';
import BFA from '../../static/images/leagues/football/BFA.png';
// Soccer
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
import { motion, useAnimation } from 'framer-motion';
// Universal
import LEAGUES from '../../universal/leagues';
import { useHistory } from 'react-router-dom';

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
    case 'NBA':
      return NBA;
    case 'Euroleague':
      return Euroleague;
    case 'ACB':
      return ACB;
    case 'Greek Basket':
      return GreekBasket;
    case 'Champions':
      return ChampionsBasket;
    case 'NBL':
      return NBL;
    case 'VTB':
      return VTB;
    case 'LBA':
      return LBA;
    case 'CBA':
      return CBA;
      // Football
    case 'NFL':
      return NFL;
    case 'CFL':
      return CFL;
    case 'Ligue Elite':
      return LigueElite;
    case 'Russian League':
      return Russian;
    case 'College Playoff':
      return College;
    case 'GFL':
      return GFL;
    case 'FECOFA':
      return FECOFA;
    case 'LUFA':
      return LUFA;
    case 'BFA':
      return BFA;
    // Baseball
    case 'Major League':
      return MajorLeague;
    case 'NPB':
      return NPB;
    case 'KBO':
      return KBO;
    case 'American League':
      return American;
    case 'LVBP':
      return LVBP;
    case 'LMP':
      return LMP;
    case 'CPBL':
      return CPBL;
    case 'LCBP':
      return LCBP;
    case 'ABL':
      return ABL;
      // Hockey
    case 'NHL':
      return NHL;
    case 'KHL':
      return KHL;
    case 'SHL':
      return SHL;
    case 'Liiga':
      return Liiga;
    case 'ELH':
      return ELH;
    case 'DEL':
      return DEL;
    case 'National League':
      return National;
    case 'Tipsport Liga':
      return Tipsport;
    case 'Elite League':
      return EliteLeague;
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
    case 'LBA':
      return 'lba';
    case 'BFA':
      return 'bfa';
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
  const filteredLeagues = leaguesSearch
    ? LEAGUES[currentSport].filter((league) => league.toLowerCase().includes(leaguesSearch.toLowerCase()))
    : LEAGUES[currentSport];
  const history = useHistory();
  const controls = useAnimation();
  controls.start({
    opacity: [0, 1],
    transiton: { duration: 0.05, ease: 'easeIn' },
  });
  return (
    <div className={styles.leagues_wrapper}>
      <div className={styles.leagues_container} style={!filteredLeagues.length ? { justifyContent: 'center', alignItems: 'center' } : {}}>
        {!filteredLeagues.length ? <EmptyLeagues />
          : (
            <>
              {filteredLeagues.map((league, i) => (
                <motion.div onClick={currentSport !== 'soccer' ? () => alert('Coming Soon...') : () => history.push('joinLeague')} whileTap={{ scale: 0.9 }} animate={controls} key={`${league}_${i}`} className={classnames(styles.league, styles[currentSport])}>
                  <div className={classnames(styles.league_image_container, styles[currentSport])}>
                    <motion.img
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transiton={{ duration: 0.05, ease: 'easeIn' }}
                      src={getLeagueImage(league)}
                      alt={`${league}_logo`}
                      className={styles[getLeagueName(league)]}
                    />
                  </div>
                  <div style={{ marginTop: '1px', fontSize: '9px' }} className={classnames(styles.league_name, 'white_text_3')}>
                    {league}
                  </div>
                </motion.div>
              ))}
            </>
          )}
      </div>
    </div>
  );
};

export default HomeLeagues;
