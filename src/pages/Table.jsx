/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import { confirmBets } from '../redux/models/activeTable/activeTableActions';
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
  availableMatches: state.availableMatches,
});

const mapDispatchToProps = (dispatch) => ({
  confirmBets: (data, username) => dispatch(confirmBets(data, username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((Table), pages.TABLE));
