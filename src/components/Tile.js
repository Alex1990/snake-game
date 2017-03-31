import React, { PropTypes } from 'react';
import { tileTypes, orientations } from '../actions';

const Tile = ({ type, snakeOrientation }) => {
  const className = `tile ${type} ${snakeOrientation ? snakeOrientation.toLowerCase() : ''}`;
  return <div className={className}></div>
};

Tile.propTypes = {
  type: PropTypes.oneOf(tileTypes),
  snakeOrientation: PropTypes.oneOf(orientations),
};

export default Tile;