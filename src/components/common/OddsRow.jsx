import React from 'react';
// Styles
import styles from './OddsRow.module.scss';
// Util
import classnames from 'classnames';

const OddsRow = ({
  homeOdds, drawOdds, awayOdds, type,
}) => (
  <div className={styles.score_row_container}>
    <div className={classnames(styles.home_score_wrapper, { [styles.type_b]: type === 'b' })}>
      {homeOdds}
      <p>PTS</p>
    </div>
    <div className={classnames(styles.draw_score_wrapper, { [styles.type_b]: type === 'b' })}>
      {drawOdds}
      <p>PTS</p>
    </div>
    <div className={classnames(styles.away_score_wrapper, { [styles.type_b]: type === 'b' })}>
      {awayOdds}
      <p>PTS</p>
    </div>
  </div>
);

export default OddsRow;
