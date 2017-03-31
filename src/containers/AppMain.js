import { connect } from 'react-redux';
import {
  initialize, start, setOrientation, togglePaused,
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
    setOrientation: (orientation) => {
      dispatch(setOrientation(orientation));
    },
  };
};

const PlayLayer = connect(
  null,
  mapDispatchToProps,
)(Main);

export default PlayLayer;