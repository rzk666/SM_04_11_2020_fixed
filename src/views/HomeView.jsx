import React from 'react';
// styles
import styles from './HomeView.module.scss';
// Components
import Filters from '../components/TasksTable/Filters';
import Table from '../components/TasksTable/Table';

const HomeView = ({ users, toggleDepartment }) => (
  <div className={styles.wrapper}>
    <div className={styles.tasks_manager_container}>
      <Filters toggleDepartment={toggleDepartment} />
      <Table users={users} />
    </div>
  </div>
);

export default HomeView;
