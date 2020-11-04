import React from 'react';
// Components
import UserRow from './UserRow';
import Loader from '../common/Loader';
// styles
import styles from './Table.module.scss';

// ----- Help Components ----- //
const TableHeader = () => (
  <div className={styles.table_header}>
    <div className={styles.employees}>Employees</div>
    <div className={styles.days}>{(new Date()).toDateString()}</div>
  </div>
);

const Table = ({ users }) => {
  const { data, isLoading } = users;
  return (
    <div className={styles.table_container}>
      <TableHeader />
      { isLoading ? <Loader />
        : (
          <>
            {!data.length
              ? <div className={styles.no_users}> No users selected </div>
              : (
                <>
                  {data.map((user) => {
                    const x = 5;
                    return <UserRow user={user} />;
                  })}
                </>
              )}
          </>
        )}
    </div>
  );
};

export default Table;
