/* eslint-disable no-underscore-dangle */
import React from 'react';

class ProfileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'STATS',
    };
  }

  updateView(currentView) {
    this.setState({ currentView });
  }

  callbacks() {
    return {
      updateView: this.updateView.bind(this),
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
