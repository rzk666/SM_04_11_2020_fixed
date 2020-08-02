/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
// Hocs
import page from '../hocs/page';
// Controller & View
import TableController from '../controllers/TableController';
import TableView from '../views/TableView';
// Dictioneries
import pages from '../universal/pages';


const Table = (props) => <TableController {...props} View={TableView} />;

const mapStateToProps = (state) => ({
  auth: state.auth,
  activeTable: state.activeTable,
});

const mapDispatchToProps = (dispatch) => ({
  // adminLogin: (data) => dispatch(adminLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Table), pages.TABLE));
