// Initial State
import INITIAL_STATE from '../../../common/app-const';
// Action Types
import {
  GET_ASSET_PATH,
  ASSET_HAS_ERROR,
  ASSET_IS_LOADING,
} from './assetsTypes';

const assets = (state = INITIAL_STATE.assets, action) => {
  switch (action.type) {
    case GET_ASSET_PATH: {
      // Add asset name
      const { data } = action;
      const { images, asset } = data;
      return {
        ...state,
        [asset]: images,
        isLoading: false,
        hasError: false,
        error: '',
      };
    }
    case ASSET_HAS_ERROR: {
      const { error } = action;
      return {
        ...state,
        error,
        hasError: true,
      };
    }
    case ASSET_IS_LOADING: {
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    }
    default: {
      return state;
    }
  }
};

export default assets;
