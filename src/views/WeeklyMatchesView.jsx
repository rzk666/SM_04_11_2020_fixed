/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
// Components
import { Modal } from 'semantic-ui-react';
import OddsRow from '../components/common/OddsRow';
// Images
import PremiereLeague from '../static/images/weeklymatches/premiereLeague.png';
import Valencia from '../static/images/weeklymatches/Valencia.png';
import Lavante from '../static/images/weeklymatches/Lavante.png';
import Barcelona from '../static/images/weeklymatches/Barcelona.png';
import Star from '../static/images/weeklymatches/Star.svg';
import WhiteStar from '../static/images/weeklymatches/WhiteStar.svg';
import BonusStar from '../static/images/weeklymatches/BonusStar.svg';
import ExitGreen from '../static/images/weeklymatches/ExitGreen.svg';
import Exit from '../static/images/icons/Exit.svg';
// Styles
import styles from './WeeklyMatches.module.scss';
// Animations
import { motion } from 'framer-motion';
// Utils
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';

const BonusButton = ({ onClick }) => (
  <div
    onClick={() => onClick()}
    className={styles.bonus_btn_container}
  >
    <motion.div
      transition={{
        repeatDelay: 0.5, loop: Infinity, duration: 3, ease: 'linear',
      }}
      animate={{
        y: [0, 30, 60],
        width: ['35%', '55%', '35%'],
        boxShadow: [
          '0px 0px 12px 12px rgba(255,255,255,0)',
          '0px 0px 12px 12px rgba(255,255,255,0.5)',
          '0px 0px 12px 12px rgba(255,255,255,0)'],
      }}
      className={styles.flash}
    />
    <div className={styles.content}>
      BONUS
      <div className={styles.stars_wrapper}>
        <img
          src={Star}
          alt="star_1"
          style={{ marginRight: '5px' }}
        />
        <img
          src={Star}
          alt="star_2"
          style={{ marginRight: '5px' }}
        />
        <img
          src={Star}
          alt="star_3"
        />
      </div>
    </div>
  </div>
);

const TableTopRow = () => (
  <div className={styles.top_row_container}>
    <div className={styles.position}>
      POS
    </div>
    <div className={styles.team}>
      TEAM
    </div>
    <div className={styles.games}>
      PL
    </div>
    <div className={styles.wins}>
      W
    </div>
    <div className={styles.draws}>
      D
    </div>
    <div className={styles.loses}>
      L
    </div>
    <div className={styles.goals}>
      F
    </div>
    <div className={styles.against}>
      A
    </div>
    <div className={styles.goal_differance}>
      GD
    </div>
    <div className={styles.points}>
      Pts
    </div>
    <div className={styles.last_six}>
      Last 6
    </div>
  </div>
);

const LastSix = ({ data }) => (
  <div className={styles.last_six_wrapper}>
    {data.map((result) => (
      <div
        className={classnames(styles.dot,
          {
            [styles.win]: result === 'win',
            [styles.draw]: result === 'draw',
            [styles.lose]: result === 'lose',
          })}
      />
    ))}
  </div>
);

const TeamRow = ({ team }) => {
  const {
    name, rank, games, wins, draws, loses, goals, against, points, lastSixMatches,
  } = team;
  return (
    <div className={styles.team_row_container}>
      <div className={styles.position}>
        {rank}
      </div>
      <div className={styles.team}>
        <img
          src={Barcelona}
          alt="Barcelona"
          style={{ width: '20px', marginRight: '6.5px' }}
        />
        {name}
      </div>
      <div className={styles.games}>
        {games}
      </div>
      <div className={styles.wins}>
        {wins}
      </div>
      <div className={styles.draws}>
        {draws}
      </div>
      <div className={styles.loses}>
        {loses}
      </div>
      <div className={styles.goals}>
        {goals}
      </div>
      <div className={styles.against}>
        {against}
      </div>
      <div className={styles.goal_differance}>
        {goals - against}
      </div>
      <div className={styles.points}>
        {points}
      </div>
      <div className={styles.last_six}>
        <LastSix data={lastSixMatches} />
      </div>
    </div>
  );
};

export const Match = ({ match }) => {
  const {
    homeTeam, awayTeam, dayName, time, homeOdds, awayOdds, drawOdds,
  } = match;
  return (
    <div className={styles.match_container}>
      <div className={styles.match_top_row}>
        <div className={styles.home_team_container}>
          {homeTeam}
          <img
            src={Valencia}
            alt="Valencia"
          />
        </div>
        <div className={styles.date_container}>
          <p>{dayName}</p>
          <p>{time}</p>
        </div>
        <div className={styles.away_team_container}>
          <img
            src={Lavante}
            alt="Valencia"
          />
          {awayTeam}
        </div>
      </div>
      <OddsRow homeOdds={homeOdds} drawOdds={drawOdds} awayOdds={awayOdds} />
    </div>
  );
};

const BonusModalContent = ({ close }) => {
  const BonusTitle = () => (
    <div className="title_wrapper">
      <img
        src={WhiteStar}
        alt="White_Star_1"
        style={{ width: '10px', marginRight: '5px' }}
      />
      BONUS
      <img
        src={WhiteStar}
        alt="White_Star_2"
        style={{ width: '10px', marginLeft: '5px' }}
      />
    </div>
  );
  const BonusCard = ({ title, points, desc }) => (
    <div className="card_container">
      <div className="score">{`+${points}`}</div>
      <div className="top">
        <img
          src={BonusStar}
          alt="Bonus Star"
          style={{ marginLeft: '2px', marginRight: '3px', width: '10px' }}
        />
        {title}
      </div>
      <div className="divider" />
      <div className="bottom">
        {desc}
      </div>
    </div>
  );
  return (
    <div className="modal_wrapper">
      <img
        src={ExitGreen}
        alt="Close Modal"
        onClick={() => close()}
        className="close_modal"
      />
      <div className="top_row">
        <BonusTitle />
      </div>
      <div className="content">
        <div className="main_text">
          <p>
            Bonus points are added automatically as long as your team did not lose the match
          </p>
        </div>
        <div className="cards_wrapper">
          <BonusCard title="One Team Exact Score" desc="Predict one team's exact score" points={5} />
          <BonusCard title="Match Exact Score" desc="Predict the match's exact score" points={20} />
          <BonusCard title="Goal Differance" desc="Predict the match's goal differance" points={20} />
        </div>
      </div>
    </div>
  );
};

const WeeklyMatchesView = ({
  activeLeague,
  isBonusOpen,
  toggleBonusModal,
}) => {
  const { currentLeague, currentLeagueMatches, currentLeagueTable } = activeLeague;
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const { type } = state;
  const isWeekly = type === 'weekly';
  const titleText = isWeekly ? 'Weekly Matches' : 'Table';
  return (
    <>
      <div className={styles.container}>
        { isWeekly
        && (
        <>
          <BonusButton onClick={() => toggleBonusModal()} />
          <Modal className="bonus_modal" open={isBonusOpen}>
            <BonusModalContent close={() => toggleBonusModal()} />
          </Modal>
        </>
        ) }
        <img
          src={Exit}
          alt="Exit"
          className={styles.exit}
          onClick={() => history.goBack()}
        />
        <div className={styles.top_title}>
          <div className={styles.title_border}>
            {`${currentLeague} ${titleText}`}
          </div>
        </div>
        <div className={styles.table_container}>
          <div className={styles.table_title}>
            <img
              src={PremiereLeague}
              alt="Premiere League"
              style={{ width: '30px' }}
            />
            {currentLeague}
          </div>
          {
            isWeekly
              ? (
                <>
                  {currentLeagueMatches.map((match) => (
                    <Match match={match} />
                  ))}
                </>
              )
              : (
                <>
                  <TableTopRow />
                  {currentLeagueTable.map((team) => (
                    <TeamRow team={team} />
                  ))}
                  <div className={styles.bottom} />
                </>
              )
        }
        </div>
      </div>
    </>
  );
};

export default WeeklyMatchesView;
