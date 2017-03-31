import { connect } from 'react-redux';
import Ground from '../components/Ground';

const mapStateToProps = (state) => {
  return {
    tiles: state.tiles,
    snakeOrientation: state.snakeOrientation,
  };
};

const PlayLayer = connect(
  mapStateToProps,
)(Ground);

export default PlayLayer;