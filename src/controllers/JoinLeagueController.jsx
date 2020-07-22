import React from 'react';

class JoinLeagueController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
    };
  }

  callbacks() {
    return {
      // handleSearchChange: this.handleSearchChange.bind(this),
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

export default JoinLeagueController;
