import React from 'react';
// Components
import { motion, AnimatePresence } from 'framer-motion';
import TableTopBar from '../components/Table/TableTopBar';
import Leaderboard from '../components/Table/Leaderboard';
import Bets from '../components/Table/Bets';
import LiveStatus from '../components/Table/LiveStatus';
import RealTable from '../components/Table/RealTable';
// Libs
import { getShortTeamName, getTeamImage } from '../common/libs';
// Utils
import classnames from 'classnames';
// Styles
import styles from './TableView.module.scss';

// ----- Help Components ----- //
const Popup = ({ activePopup }) => {
  const {
    title,
    type,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    winner,
  } = activePopup;
  return (
    <AnimatePresence>
      <motion.div className={styles.popup_container}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.bottom_container}>
          { type === 'info'
            ? (
              <>
                <img
                  src={getTeamImage(homeTeam)}
                  alt="Home"
                />
                <div className={styles.vs}>
                  {getShortTeamName(homeTeam)}
                  <p>VS</p>
                  {getShortTeamName(awayTeam)}
                </div>
                <img
                  src={getTeamImage(awayTeam)}
                  alt="Home"
                />
              </>
            ) : (
              <>
                <div className={styles.home_team}>
                  {getShortTeamName(homeTeam)}
                  <img
                    src={getTeamImage(homeTeam)}
                    alt="Home"
                    style={{ marginLeft: '5px' }}
                  />
                </div>
                <div className={styles.goals}>
                  <p style={winner === 'home' ? { color: '#57bb78' } : {}}>{homeScore}</p>
                  <p style={{ margin: '0 3px' }}>:</p>
                  <p style={winner === 'away' ? { color: '#57bb78' } : {}}>{awayScore}</p>
                </div>
                <div className={styles.away_team}>
                  <img
                    src={getTeamImage(awayTeam)}
                    alt="Away"
                    style={{ marginRight: '5px' }}
                  />
                  {getShortTeamName(awayTeam)}
                </div>
              </>
            )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const TableView = ({
  currentView,
  changeView,
  activeTable,
  availableMatches,
  confirmBets,
  activePopup,
  auth,
}) => {
  console.log(activePopup);
  let View;
  const { user } = auth;
  const { bets } = user;
  switch (currentView) {
    case 'LEADERBOARD':
      View = null;
      break;
    case 'MY BETS':
      View = (
        <Bets
          initialBets={bets}
          confirmBets={(newBets) => confirmBets(newBets)}
          availableMatches={availableMatches}
          activeTable={activeTable}
          auth={auth}
        />
      );
      break;
    case 'LIVE STATUS':
      View = <LiveStatus availableMatches={availableMatches} activeTable={activeTable} />;
      break;
    case 'REAL TABLE':
      View = <RealTable activeTable={activeTable} />;
      break;
    default:
      break;
  }
  return (
    <>
      <TableTopBar
        currentView={currentView}
        changeView={(view) => changeView(view)}
      />
      <div className={styles.view_container}>
        <Leaderboard hide={!(currentView === 'LEADERBOARD')} user={user} availableMatches={availableMatches} activeTable={activeTable} />
        {View}
        { activePopup.type !== 'none' && <Popup activePopup={activePopup} />}
      </div>
    </>
  );
};

export default TableView;
