import React from 'react';
// Components
import UserRow from './UserRow';
// Utils
import classnames from 'classnames';
// styles
import styles from './Table.module.scss';

// ----- Help Components ----- //
const TableHeader = () => (
  <div className={styles.table_header}>
    <div className={styles.employees}>Employees</div>
    <div className={styles.days}>{(new Date()).toDateString()}</div>
  </div>
);

const Table = ({
  users,
  filterByEmployee,
  handleUserSelection,
}) => {
  const { data, isLoading } = users;
  return (
    <div className={styles.table_container}>
      <TableHeader />
      {!data.length
        ? <div className={styles.no_users}> No users selected </div>
        : (
          <div className={classnames(styles.table_content, { [styles.loading]: isLoading })}>
            {data.map((user) => (
              <UserRow
                handleUserSelection={handleUserSelection}
                filterByEmployee={filterByEmployee}
                user={user}
              />
            ))}
          </div>
        )}

    </div>
  );
};

export default Table;
