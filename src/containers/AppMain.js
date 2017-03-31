import { connect } from 'react-redux';
import {
  initialize, start, changeOrientation, togglePaused,
} from '../actions';
import Main from '../components/Main';

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: () => {
      dispatch(initialize());
    },
    start: () => {
      dispatch(start());
    },
    togglePaused: () => {
      dispatch(togglePaused());
    },
    changeOrientation: (orientation) => {
      dispatch(changeOrientation(orientation));
    },
  };
};

const PlayLayer = connect(
  null,
  mapDispatchToProps,
)(Main);

export default PlayLayer;