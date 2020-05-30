import React from 'react';
// Utils
import { connect } from 'react-redux';
// Redux Actions
import {
  fetchAsset,
} from '../redux/models/assets/assetsActions';

export default (ComposedComponent) => {
  class WithAssets extends React.Component {
    componentDidMount() {
      // If we don't have static assets load them
      const { assets, fetchAssets } = this.props;
      if (!assets.splash) {
        fetchAssets('splash');
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
    fetchAssets: (data) => dispatch(fetchAsset(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)((WithAssets));
};
