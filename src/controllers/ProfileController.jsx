/* eslint-disable no-underscore-dangle */
import React from 'react';

class ProfileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFocused: false,
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

  handleSearchFocus() {
    this.setState({ searchFocused: true });
  }

  handleSearchBlur() {
    this.setState({ searchFocused: false });
  }

  callbacks() {
    return {
      updateView: this.updateView.bind(this),
      handleSearchChange: this.handleSearchChange.bind(this),
      handleSearchFocus: this.handleSearchFocus.bind(this),
      handleSearchBlur: this.handleSearchBlur.bind(this),
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
