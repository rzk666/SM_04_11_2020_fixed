import React from 'react';

class JoinLeagueController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: '3',
      isModalOpen: false,
      currentLeaguePlayers: 0,
      currentLeagueMatches: 0,
    };
  }

  handlePriceChange(price) {
    this.setState({ currentPrice: price });
  }

  toggleModal(players, matches) {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
      currentLeaguePlayers: players,
      currentLeagueMatches: matches,
    });
  }

  callbacks() {
    return {
      handlePriceChange: this.handlePriceChange.bind(this),
      toggleModal: this.toggleModal.bind(this),
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
