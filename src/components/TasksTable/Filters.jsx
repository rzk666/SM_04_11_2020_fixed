import React from 'react';
// styles
import styles from './Filters.module.scss';
// Components
import { Checkbox } from 'semantic-ui-react';
// Common
import { DEPARTMENTS } from '../../common/app-const';

const Filters = (props) => {
  const x = 5;
  return (
    <div className={styles.filters_container}>
      <div className={styles.filter_by_employee}>
        <Checkbox toggle label="Filter By Employee" />
      </div>
      <div className={styles.departments_container}>
        {DEPARTMENTS.map((department) => <Checkbox label={department} />)}
      </div>
    </div>
  );
};

export default Filters;
