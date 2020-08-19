import React from 'react';
// Styles
import styles from './RealTable.module.scss';
// Components
import LeagueLiveTable from '../common/LeagueLiveTable';

const RealTable = ({ activeTable }) => {
  const { leagues } = activeTable;
  const filteredLeagues = leagues.filter((x) => x !== 'Champions League');
  return (
    <div style={{ backgroundColor: '#ebebeb' }} className={styles.container}>
      {filteredLeagues.map((league) => (
        <div style={{ width: '90%' }}>
          <LeagueLiveTable currentLeague={league} />
        </div>
      ))}
    </div>
  );
};

export default RealTable;
