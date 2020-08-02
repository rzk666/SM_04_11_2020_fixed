import React from 'react';
// Components
import TableTopBar from '../components/Table/TableTopBar';
import Leaderboard from '../components/Table/Leaderboard';
import Bets from '../components/Table/Bets';
import LiveStatus from '../components/Table/LiveStatus';
import RealTable from '../components/Table/RealTable';
// Styles
import styles from './TableView.module.scss';
// Images

const TableView = ({
  currentView,
  changeView,
  activeTable,
}) => {
  let View;
  switch (currentView) {
    case 'LEADERBOARD':
      View = <Leaderboard activeTable={activeTable} />;
      break;
    case 'MY BETS':
      View = <Bets activeTable={activeTable} />;
      break;
    case 'LIVE STATUS':
      View = <LiveStatus activeTable={activeTable} />;
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
        {View}
      </div>
    </>
  );
};

export default TableView;
