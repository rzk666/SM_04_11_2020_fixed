import React from 'react';
// Components
import TableTopBar from '../components/Table/TableTopBar';
// Styles
import styles from './TableView.module.scss';
// Images

const TableView = ({
  currentView,
  changeView,
}) => {
  const x = 5;
  return (
    <div className={styles.table_container}>
      <TableTopBar
        currentView={currentView}
        changeView={(view) => changeView(view)}
      />
    </div>
  );
};

export default TableView;
