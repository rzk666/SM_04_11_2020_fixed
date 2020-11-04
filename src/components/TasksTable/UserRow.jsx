import React from 'react';
// styles
import styles from './UserRow.module.scss';

// ----- Help Components ----- //
const User = ({ avatar, name }) => {
  const x = 5;
  return (
    <div className={styles.user}>
      <img
        alt={`${name}_avatar`}
        className={styles.avatar}
        src={avatar}
      />
      <p>{name}</p>
    </div>
  );
};

const Task = ({ task }) => {
  const { id, title, color } = task;
  return (
    <div style={{ backgroundColor: !id ? 'black' : color }} className={styles.task}>
      {!id
        ? '?'
        : title}
    </div>
  );
};

const UsersRow = ({ user }) => {
  const { task, name, avatar } = user;
  return (
    <div className={styles.row_container}>
      <User avatar={avatar} name={name} />
      <Task task={task} />
    </div>
  );
};

export default UsersRow;
