import React from 'react';
// styles
import styles from './HomeView.module.scss';
// Components
import Filters from '../components/TasksTable/Filters';
import Table from '../components/TasksTable/Table';

const HomeView = ({
  users,
  toggleDepartment,
  toggleFilterByEmployee,
  filterByEmployee,
  handleUserSelection,
  indeterminateDepartments,
  selectedDepartments,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.tasks_manager_container}>
      <Filters
        selectedDepartments={selectedDepartments}
        indeterminateDepartments={indeterminateDepartments}
        toggleFilterByEmployee={toggleFilterByEmployee}
        filterByEmployee={filterByEmployee}
        toggleDepartment={toggleDepartment}
      />
      <Table
        handleUserSelection={handleUserSelection}
        filterByEmployee={filterByEmployee}
        users={users}
      />
    </div>
  </div>
);

export default HomeView;
