/* eslint-disable no-underscore-dangle */
import React from 'react';

class TableController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'LEADERBOARD',
    };
  }

  componentDidMount() {
    const { activeTable, history } = this.props;
    if (!activeTable.name) {
      history.push('/');
    }
  }

  changeView(view) {
    this.setState({ currentView: view });
  }

  confirmBets(bets) {
    const { confirmBets, auth } = this.props;
    const { user } = auth;
    const { name } = user;
    confirmBets(bets, name);
  }

  callbacks() {
    return {
      changeView: this.changeView.bind(this),
      confirmBets: this.confirmBets.bind(this),
    };
  }

  render() {
    const { View } = this.props;
    return (
      <View
        {...this.props}
        {...this.state}
        {...this.callbacks()}
      />
    );
  }
}

export default TableController;
