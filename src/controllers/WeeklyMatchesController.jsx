/* eslint-disable no-underscore-dangle */
import React from 'react';

class WeeklyMatchesController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBonusOpen: false,
    };
  }

  toggleBonusModal() {
    const { isBonusOpen } = this.state;
    this.setState({ isBonusOpen: !isBonusOpen });
  }

  callbacks() {
    return {
      toggleBonusModal: this.toggleBonusModal.bind(this),
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

export default WeeklyMatchesController;
