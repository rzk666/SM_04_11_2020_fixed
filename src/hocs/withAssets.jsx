import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  fetchAsset,
} from '../redux/models/assets/assetsActions';

// Dictioneries
const STATIC_ASSETS = ['splash'];

export default (ComposedComponent) => {
  class WithAssets extends React.Component {
    componentDidMount() {
      // If we don't have static assets load them
      const { assets, fetchAsset } = this.props;
      if (!assets.splash.length) {
        STATIC_ASSETS.map((currentAsset) => fetchAsset(currentAsset));
      }
      // Then, if we don't have assets for the current page load them
    }

    render() {
      return (
        <>
          <ComposedComponent {...this.props} />
        </>
      );
    }
  }

  const mapStateToProps = (state) => ({
    assets: state.assets,
  });

  const mapDispatchToProps = (dispatch) => ({
    fetchAsset: (data) => dispatch(fetchAsset(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)((WithAssets));
};
