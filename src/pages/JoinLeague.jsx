/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import { updateActiveTable } from '../redux/models/activeTable/activeTableActions';
// Hocs
import page from '../hocs/page';
// Controller & View
import JoinLeagueController from '../controllers/JoinLeagueController';
import JoinLeagueView from '../views/JoinLeagueView';
// Dictioneries
import pages from '../universal/pages';


const JoinLeague = (props) => <JoinLeagueController {...props} View={JoinLeagueView} />;

const mapStateToProps = (state) => ({
  // auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  updateActiveTable: (data, user) => dispatch(updateActiveTable(data, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(page((JoinLeague), pages.JOIN_LEAGUE));
