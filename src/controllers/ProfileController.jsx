/* eslint-disable no-underscore-dangle */
import React from 'react';

class ProfileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'STATS',
      friendsSearch: '',
    };
  }

  updateView(currentView) {
    this.setState({ currentView });
  }

  handleSearchChange(value) {
    this.setState({ friendsSearch: value });
  }

  callbacks() {
    return {
      updateView: this.updateView.bind(this),
      handleSearchChange: this.handleSearchChange.bind(this),
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

export default ProfileController;
