import React from 'react';
// Styles
import styles from './DashboardView.module.scss';
// Images
import Beatem from '../static/images/splash/mainSplash.svg';

const DashboardView = ({
  webSocket,
}) => {
  const { connected } = webSocket;
  if (!connected) {
    return (
      <div className={styles.test}>
        connecting...
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <img
        src={Beatem}
        alt="Beatem"
        className={styles.beat_em}
      />
      <div className={styles.title}>
        ADMIN DASHBOARD
      </div>
    </div>
  );
};

export default DashboardView;
