/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
// Images
import PlayerIcon from '../static/images/joinleague/player.svg';
import SoccerIcon from '../static/images/joinleague/soccer.svg';
import TrophyIcon from '../static/images/joinleague/trophy.svg';
import Exit from '../static/images/icons/Exit.svg';
// Components
import JoinCard from '../components/JoinLeague/JoinCard';
import LeagueRules from '../components/JoinLeague/LeagueRules';
import PriceBar from '../components/JoinLeague/PriceBar';
import JoinFooter from '../components/JoinLeague/JoinFooter';
import { Modal } from 'semantic-ui-react';
// Styles
import styles from './JoinLeagueView.module.scss';
// Utils
import { useHistory } from 'react-router-dom';
// Misc
import { FAKE_TABLES } from '../common/fake-data';
import { useState } from 'react';

const JoinModalContent = ({
  prize, close, matches, players, joinTable,
}) => {
  const history = useHistory();
  const [type, setType] = useState('a');
  return (
    <div className="modal_wrapper">
      <div className="top_row">
        <div className="exit_wrapper">
          <img
            src={Exit}
            alt="Quit"
            onClick={() => close()}
          />
        </div>
        <div className="top_row_content">
          <div className="players">
            <img src={PlayerIcon} alt="players" style={{ marginRight: '5px' }} />
            {`${players} Players`}
          </div>
          <div className="players">
            <img src={SoccerIcon} alt="players" style={{ marginRight: '5px' }} />
            {`${matches} Matches`}
          </div>
          <div className="prize">
            <img src={TrophyIcon} alt="players" style={{ marginRight: '5px' }} />
            {`€${prize}`}
          </div>
        </div>
      </div>
      <LeagueRules onClick={(type) => setType(type)} />
      <div
        onClick={() => joinTable(type)}
        className="bottom"
      >
        JOIN LEAGUE
      </div>
    </div>
  );
};

const JoinLeagueView = ({
  currentPrice,
  handlePriceChange,
  currentLeaguePlayers,
  currentLeagueMatches,
  toggleModal,
  isModalOpen,
  joinTable,
}) => {
  const x = 5;
  return (
    <>
      <div className={styles.wrapper}>
        <Modal className="join_modal" open={isModalOpen}>
          <JoinModalContent
            joinTable={(type) => joinTable(type)}
            prize={currentPrice * currentLeaguePlayers}
            matches={currentLeagueMatches}
            players={currentLeaguePlayers}
            close={() => toggleModal(0, 0)}
          />
        </Modal>
        <PriceBar
          currentPrice={currentPrice}
          changePrice={(price) => handlePriceChange(price)}
        />
        <div className={styles.cards_container}>
          {FAKE_TABLES.map((table) => (
            <JoinCard
              players={table.players}
              matches={table.matches}
              currentPrice={currentPrice}
              onClick={() => toggleModal(table.players, table.matches)}
            />
          ))}
        </div>
        <JoinFooter />
      </div>
    </>
  );
};

export default JoinLeagueView;
