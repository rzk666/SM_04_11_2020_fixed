import React from 'react';
// Redux
import { connect } from 'react-redux';
// Components
import HomeController from '../controllers/HomeController';
import HomeView from '../views/HomeView';

const Home = (props) => <HomeController {...props} View={HomeView} />;

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  // Add redux actions here
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
