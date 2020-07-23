import React from 'react';

class JoinLeagueController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: '3',
    };
  }

  handlePriceChange(price) {
    this.setState({ currentPrice: price });
  }

  callbacks() {
    return {
      handlePriceChange: this.handlePriceChange.bind(this),
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
