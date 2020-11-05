import React from 'react';
// styles
import styles from './Filters.module.scss';
// Components
import { Checkbox } from 'semantic-ui-react';
// Common
import { DEPARTMENTS } from '../../common/app-const';

const Filters = ({
  toggleDepartment,
  toggleFilterByEmployee,
  filterByEmployee,
  indeterminateDepartments,
  selectedDepartments,
}) => (
  <div className={styles.filters_container}>
    <div className={styles.filter_by_employee}>
      <p> Filter By Employee </p>
      <Checkbox
        onClick={() => toggleFilterByEmployee()}
        toggle
        checked={filterByEmployee}
      />
    </div>
    <div className={styles.departments}>
      {DEPARTMENTS.map((department) => {
        const { title, id } = department;
        const isIndeterminate = indeterminateDepartments.find((x) => x === id);
        const isSelected = selectedDepartments.find((x) => x === id);
        return (
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isSelected}
            onClick={() => toggleDepartment(id)}
            label={title}
          />
        );
      })}
    </div>
  </div>
);

export default Filters;
