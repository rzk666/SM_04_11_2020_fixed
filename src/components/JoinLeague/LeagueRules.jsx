import React, { useState } from 'react';
// Images
import FirstPlace from '../../static/images/joinleague/First.svg';
import SecondPlace from '../../static/images/joinleague/Second.svg';
import ThirdPlace from '../../static/images/joinleague/Third.svg';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';
// Styles
import styles from './LeagueRules.module.scss';

const Rule = ({
  img, isActive, title, subText, reduceTextSize, onClick, disabled, creating,
}) => (
  <div style={disabled ? { opacity: 0.5 } : {}} onClick={() => { !disabled && onClick(); }} className={classnames(styles.rule, { [styles.active]: isActive })}>
    <div className={styles.first_section}>
      <div className={classnames(styles.radio, { [styles.active]: isActive })} />
      <motion.img style={creating ? { width: '80px' } : {}} initial={{ scale: 0.9 }} animate={isActive ? { scale: 1 } : { scale: 0.8 }} src={img} alt="trophies" />
    </div>
    <div className={styles.second_section}>
      <div className={classnames(styles.description, { [styles.active]: isActive })}>
        <p className={styles.title}>{title}</p>
        <p className={classnames(styles.sub_text, { [styles.reduce_size]: reduceTextSize && !creating })}>{subText}</p>
      </div>
    </div>
  </div>
);

const LeagueRules = ({ creating, players, onClick }) => {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.wrapper}>
      <Rule creating={creating} isActive={active === 0} onClick={() => { onClick && onClick('a'); setActive(0); }} img={FirstPlace} title="THERE CAN ONLY BE ONE" subText="First Place: 100% Winning Prize" />
      <Rule creating={creating} disabled={players < 5} isActive={active === 1} onClick={() => { if (players >= 5) { onClick && onClick('b'); setActive(1); } }} img={SecondPlace} title="SPLIT THE FORTUNE" subText="First Place: 70%, Second Place: 30%" />
      <Rule creating={creating} disabled={players < 9} isActive={active === 2} onClick={() => { if (players >= 9) { onClick && onClick('c'); setActive(2); } }} reduceTextSize img={ThirdPlace} title="STRENGTH IN NUMBERS" subText="First Place: 50%, Second Place: 30%,        Third Place: 20%" />
    </div>
  );
};

export default LeagueRules;
