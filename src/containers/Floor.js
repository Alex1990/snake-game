import { connect } from 'react-redux';
import FloorComponent from '../components/Floor';

const mapStateToProps = (state) => {
  return {
    tiles: state.tiles,
    snakeOrientation: state.snakeOrientation,
  };
};

const Floor = connect(
  mapStateToProps,
)(FloorComponent);

export default Floor;