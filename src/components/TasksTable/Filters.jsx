import React from 'react';
// styles
import styles from './Filters.module.scss';
// Components
import { Checkbox } from 'semantic-ui-react';
// Common
import { DEPARTMENTS } from '../../common/app-const';

const Filters = ({ toggleDepartment }) => (
  <div className={styles.filters_container}>
    <div className={styles.filter_by_employee}>
      <p> Filter By Employee </p>
      <Checkbox toggle />
    </div>
    <div className={styles.departments}>
      {DEPARTMENTS.map((department, i) => (
        <Checkbox
          onClick={() => toggleDepartment(i + 1)}
          label={department}
        />
      ))}
    </div>
  </div>
);

export default Filters;
