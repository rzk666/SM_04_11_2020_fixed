import React from 'react';
// Components
import SportsBar from '../components/Home/SportsBar';
// Images
// import RightArrow from '../static/images/icons/rightarrow.svg';
// Util
import classnames from 'classnames';
// Styles
import styles from './HomeView.module.scss';

// ----- App Components ----- //
const Card = ({ type, onClick }) => {
  const textTitle = type === 'create'
    ? 'Create League'
    : 'Join League';
  const textBody = type === 'create'
    ? 'Create your own league and challange your friends'
    : 'Join a friend\'s league and show \'em who\'s the boss';
  return (
    <div className={styles.card_container}>
      <div className={styles.divider} />
      <div className={styles.text_container}>
        <div className={styles.text_title}>{textTitle}</div>
        {textBody}
      </div>
      <div className={styles.right_arrow}>{'>'}</div>
    </div>
  );
};

const HomeView = ({
  login,
  currentSport,
  changeSport,
}) => (
  <div className={styles.wrapper}>
    <SportsBar currentSport={currentSport} changeSport={(sport) => changeSport(sport)} />
    <div className={styles.top_banner}>
      <div className={classnames(styles.banner_title)}>
        JOIN OR CREATE YOUR OWN LEAGUES!
        <div className={styles.buttons_container}>
          <Card type="create" />
          <Card type="join" />
        </div>
      </div>
    </div>
  </div>
);

export default HomeView;
