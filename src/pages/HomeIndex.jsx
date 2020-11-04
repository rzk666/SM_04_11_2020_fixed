import React from 'react';
// Redux
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/models/users/usersActions';
// Components
import HomeController from '../controllers/HomeController';
import HomeView from '../views/HomeView';

const Home = (props) => <HomeController {...props} View={HomeView} />;

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (firstIndex,
    endIndex,
    orderBy,
    withTasks) => dispatch(fetchUsers(firstIndex, endIndex, orderBy, withTasks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
