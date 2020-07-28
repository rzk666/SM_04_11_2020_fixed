/* eslint-disable no-underscore-dangle */
import React from 'react';

class TableController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'LEADERBOARD',
    };
  }

  changeView(view) {
    this.setState({ currentView: view });
  }

  callbacks() {
    return {
      changeView: this.changeView.bind(this),
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
