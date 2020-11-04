import React from 'react';
// styles
import styles from './HomeView.module.scss';
// Components
import Filters from '../components/TasksTable/Filters';
import Table from '../components/TasksTable/Table';

const HomeView = (props) => (
  <div className={styles.wrapper}>
    <div className={styles.tasks_manager_container}>
      <Filters />
      <Table />
    </div>
  </div>
);

export default HomeView;
