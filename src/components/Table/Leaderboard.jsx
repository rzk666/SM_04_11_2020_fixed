import React from 'react';
// Styles
import styles from './Leaderboard.module.scss';
// Animations
import { motion } from 'framer-motion';
// Utils
import classnames from 'classnames';

const Leaderboard = ({ activeTable }) => {
  // const {
  //   name,
  //   description,
  //   players,
  //   prizePool,
  //   leagues,
  //   type,
  //   matches,
  //   users,
  // } = activeTable;
  console.log(activeTable);
  return (
    <div className={styles.container}>
      {/* {name}
      {description}
      {players}
      {prizePool}
      {leagues.map((league) => league)}
      {type}
      {matches}
      {users.map((user) => user.name)} */}
    </div>
  );
};

export default Leaderboard;
