import React from 'react';
// Styles
import styles from './Bets.module.scss';
// Components
import OddsRow from '../common/OddsRow';
import { Input } from 'semantic-ui-react';
// Animations
import { motion, useAnimation } from 'framer-motion';
// Images
import LockIcon from '../../static/images/icons/lockicon.svg';
import EditIcon from '../../static/images/icons/editicon.svg';
import GreenConfirm from '../../static/images/icons/confirmgreen.svg';
// Utils
import { getShortDayName, getTeamImage } from '../../common/libs';


const getMatchRowIcon = (isLocked, matchTime) => {
  let icon;
  const isMatchLive = matchTime !== 0;
  if (matchTime === 'FT') {
    icon = (
      <div className={styles.time}>
        {matchTime}
      </div>
    );
  } else if (isLocked || isMatchLive) {
    // Match is locked but not started
    icon = <img src={LockIcon} alt="locked" className={styles.icon} style={{ width: '12px' }} />;
  } else if (!isLocked && matchTime === 0) {
    // Match is not locked and not started
    icon = <img src={EditIcon} alt="edit" className={styles.icon} style={{ width: '12px' }} />;
  }
  return (
    icon
  );
};

const MatchBetRow = ({
  match,
  setBets,
  currentBets,
}) => {
  const {
    homeTeam,
    awayTeam,
    homeOdds,
    drawOdds,
    awayOdds,
    startDate,
    matchTime,
    homeScore,
    awayScore,
    id,
    isLocked,
  } = match;
  return (
    <div className={styles.match_row_container}>
      <div className={styles.match_top_row}>
        {getMatchRowIcon(isLocked, matchTime)}
        <div className={styles.team_container}>
          <img
            src={getTeamImage(homeTeam)}
            alt="home"
          />
          {homeTeam}
        </div>
        <div className={styles.bets_container}>
          <div className={styles.bets}>
            <Input disabled={isLocked} value={currentBets.find((bet) => bet.matchId === id).homeScore} fluid className={styles.bet_input} onChange={(e, data) => setBets(id, 'homeScore', parseInt(data.value[data.value.length - 1]))} />
            <p style={{ margin: '0 5px' }}>:</p>
            <Input disabled={isLocked} value={currentBets.find((bet) => bet.matchId === id).awayScore} fluid className={styles.bet_input} onChange={(e, data) => setBets(id, 'awayScore', parseInt(data.value[data.value.length - 1]))} />
          </div>
          {matchTime === 0
            ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className={styles.date}>{`${getShortDayName(startDate.getDay())}, ${startDate.getDate()}/${startDate.getMonth() + 1}`}</p>
                <p className={styles.date}>{`${startDate.getHours()}:00`}</p>
              </div>
            )
            : (
              <div className={styles.final_score_container}>
                <div className={styles.score_square}>
                  {homeScore}
                </div>
                <div style={{ margin: '0 15px', marginTop: '3px' }}>
                  :
                </div>
                <div className={styles.score_square}>
                  {awayScore}
                </div>
              </div>
            )}
        </div>
        <div className={styles.team_container}>
          <img
            src={getTeamImage(awayTeam)}
            alt="home"
          />
          {awayTeam}
        </div>
      </div>
      <OddsRow
        type="b"
        awayOdds={awayOdds}
        drawOdds={drawOdds}
        homeOdds={homeOdds}
      />
    </div>
  );
};

const Bottom = ({ confirmBets }) => {
  const control = useAnimation();
  return (
    <div className={styles.bottom}>
      <motion.div className={styles.snackbar} animate={control}>
        Bets Confirmed!
      </motion.div>
      <div className={styles.gradient_block} />
      <motion.div
        onClick={() => {
          control.start({ opacity: [0, 1, 1, 1, 0], transition: { duration: 1.5, ease: 'easeInOut' } });
          confirmBets();
        }}
        whileTap={{ scale: 0.9 }}
        className={styles.confirm_bets}
      >
        CONFIRM BET
        <img src={GreenConfirm} alt="confirm" clas />
      </motion.div>
    </div>
  );
};

class Bets extends React.Component {
  constructor(props) {
    super(props);
    const { activeTable, auth } = props;
    const { users } = activeTable;
    const { user } = auth;
    const loggedUser = users.find((currentUser) => currentUser.name === user.name);
    const { bets } = loggedUser;
    const { initialBets } = props;
    this.state = {
      currentBets: bets.length === 0 ? initialBets : bets,
    };
  }

  // type should be sent as 'homeScore' or 'awayScore'
  setBets(matchId, type, bet) {
    const { currentBets } = this.state;
    let newBet = currentBets.find((bet) => bet.matchId === matchId);
    newBet = { ...newBet, [type]: bet || 0 };
    const newBets = [...currentBets].filter((bet) => bet.matchId !== matchId);
    newBets.push(newBet);
    this.setState({ currentBets: newBets });
  }

  confirmBets() {
    const { confirmBets } = this.props;
    const { currentBets } = this.state;
    confirmBets(currentBets);
  }

  render() {
    const { currentBets } = this.state;
    const { availableMatches, activeTable } = this.props;
    const selectedMatches = activeTable.matches;
    const { matches } = availableMatches;
    const sortedMatches = selectedMatches.sort((a, b) => {
      const matchA = matches.find((match) => match.id === a);
      const matchB = matches.find((match) => match.id === b);
      return matchA.order - matchB.order;
    });
    return (
      <div className={styles.container}>
        {sortedMatches.map((matchId, index) => {
          const currentMatch = matches.find((match) => match.id === matchId);
          const isLast = index === selectedMatches.length - 1;
          return (
            <>
              <div style={{ width: '90%' }}>
                <MatchBetRow
                  currentBets={currentBets}
                  setBets={(matchId, type, bet) => this.setBets(matchId, type, bet)}
                  match={currentMatch}
                />
              </div>
              {isLast && (
              <div className={styles.dead_background} />
              )}
            </>
          );
        })}
        <Bottom confirmBets={() => this.confirmBets()} />
      </div>
    );
  }
}

export default Bets;
