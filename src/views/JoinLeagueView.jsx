import React from 'react';
// Components
import JoinCard from '../components/JoinLeague/JoinCard';
import PriceBar from '../components/JoinLeague/PriceBar';
import JoinFooter from '../components/JoinLeague/JoinFooter';
// Styles
import styles from './JoinLeagueView.module.scss';
// Misc
import { FAKE_TABLES } from '../common/fake-data';

const JoinLeagueView = ({
  currentPrice,
  handlePriceChange,
}) => {
  const x = 5;
  return (
    <>
      <div className={styles.wrapper}>
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
            />
          ))}
        </div>
        <JoinFooter />
      </div>
    </>
  );
};

export default JoinLeagueView;
